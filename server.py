import http.server
import socketserver

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'public, max-age=3600') 
        super().end_headers()

PORT = 8000

handler = MyHandler
httpd = socketserver.TCPServer(("", PORT), handler)

print(f"Serving at port {PORT}")
httpd.serve_forever()
