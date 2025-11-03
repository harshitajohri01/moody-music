### 🎵 Emotion-Based Music Recommender System

This project is an AI-driven music recommendation system that detects a user's emotion through
facial expression recognition and automatically suggests songs that match the user's mood.
It aims to improve the listening experience by connecting emotional state with music preference.

---

### 😊 How It Works
1. The webcam captures the user's face.
2. A CNN-based model predicts the current emotion (happy, sad, neutral, angry, etc.).
3. The system maps the detected emotion to a suitable music category.
4. Songs are recommended automatically using Spotify API / local music dataset.

---

### 🚀 Features
- Real-time face emotion detection
- Automatic music recommendation based on mood
- Supports multiple emotions (Happy, Sad, Angry, Neutral, etc.)
- Integrated with Spotify API / Local Music Player
- Simple and interactive user interface

---

### 🧠 Tech Stack
- Python
- OpenCV (Face Detection)
- TensorFlow / Keras (CNN for Emotion Recognition)
- NumPy + Pandas (Data Processing)
- Spotify API / Custom Music Dataset
- Tkinter / Streamlit (GUI)

---

### ⚙️ System Architecture

User → Webcam → Emotion Detection Model → Emotion to Genre Mapping → Music Recommendation Engine → Song Playback

---

### 📚 Dataset Sources
- **FER-2013 Dataset**
- **Spotify Genre/Audio Feature Dataset**

---

### 🎯 Future Enhancements
- Voice-based emotion detection
- Personalized playlist based on listening history
- Hybrid recommendation (Emotion + User Preference)

---

### ⚠️ Disclaimer
This system is designed for **research and personal use** and may not always perfectly represent emotional state.
