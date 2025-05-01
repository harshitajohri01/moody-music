let player;
let currentEmotion = '';
let emotionDetected = false;

const emotionMusicMap = {
    happy: ['upbeat pop', 'dance music', 'happy rock'],
    sad: ['slow ballads', 'emotional songs', 'acoustic'],
    angry: ['metal', 'rock', 'intense electronic'],
    neutral: ['indie pop', 'ambient', 'lofi'],
    surprised: ['energetic pop', 'edm', 'uplifting'],
    fearful: ['calming music', 'peaceful', 'meditation'],
    disgusted: ['punk rock', 'alternative', 'grunge']
};

async function initFaceAPI() {
    try {
        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('models'),
            faceapi.nets.faceExpressionNet.loadFromUri('models')
        ]);
        document.querySelector('.loading-screen').style.display = 'none';
        startWebcam();
    } catch (error) {
        console.error('Error loading models:', error);
        alert('Error loading emotion detection models. Please refresh the page.');
    }
}
async function startWebcam() {
    const video = document.getElementById('video');
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.addEventListener('play', () => detectOnceEmotion(video));
    } catch (error) {
        console.error('Error accessing webcam:', error);
        alert('Please allow camera access.');
    }
}

async function detectOnceEmotion(video) {
    const canvas = document.getElementById('overlay');
    const displaySize = { width: video.videoWidth, height: video.videoHeight };
    faceapi.matchDimensions(canvas, displaySize);

    if (video.videoWidth === 0 || video.videoHeight === 0) {
        setTimeout(() => detectOnceEmotion(video), 200);
        return;
    }

    const interval = setInterval(async () => {
        if (!emotionDetected) {
            const detections = await faceapi.detectAllFaces(
                video,
                new faceapi.TinyFaceDetectorOptions()
            ).withFaceExpressions();

            if (detections.length > 0) {
                const expressions = detections[0].expressions;
                const dominantEmotion = Object.keys(expressions).reduce((a, b) =>
                    expressions[a] > expressions[b] ? a : b
                );

                currentEmotion = dominantEmotion;
                document.getElementById('emotion-text').textContent = dominantEmotion;
                emotionDetected = true;
                clearInterval(interval);
                searchAndPlayMusic(dominantEmotion);

                const resizedDetections = faceapi.resizeResults(detections, displaySize);
                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
                faceapi.draw.drawDetections(canvas, resizedDetections);
                faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
            }
        }
    }, 1000);
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '360',
        width: '640',
        videoId: '',
        playerVars: {
            'autoplay': 1,
            'controls': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onError': onPlayerError
        }
    });
}

function onPlayerReady(event) {
    console.log('YouTube player ready');
}

function onPlayerError(event) {
    console.error('Player error:', event);
    searchAndPlayMusic(currentEmotion); 
}

async function searchAndPlayMusic(emotion) {
    const genres = emotionMusicMap[emotion] || emotionMusicMap.neutral;
    const query = genres[Math.floor(Math.random() * genres.length)];

    try {
        const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&videoCategoryId=10&key=AIzaSyBHyNAr5JVvvL0SRetEHBtnpQTz3O4V4uw`);
        const data = await res.json();
        if (data.items && data.items.length > 0) {
            const videoId = data.items[0].id.videoId;
            player.loadVideoById(videoId);
            document.getElementById('song-title').textContent = data.items[0].snippet.title;
        }
    } catch (err) {
        console.error('YouTube fetch error:', err);
    }
}

document.addEventListener('DOMContentLoaded', initFaceAPI);
