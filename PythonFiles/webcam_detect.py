import cv2
import uvicorn
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from io import BytesIO
import numpy as np

app = FastAPI()

#adjusts the darkness of the camera so that faces are more likely to be detected
def adjust_brightness(frame, alpha=1.5, beta=20):
    adjusted_frame = cv2.convertScaleAbs(frame, alpha=alpha, beta=beta)
    return adjusted_frame

#tries to detect a face based on the haar cascade algorithm. and even draws border aruund
def blur_faces(frame):
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    haar_cascade = cv2.CascadeClassifier('PythonFiles/haar_face.xml')
    faces_rect = haar_cascade.detectMultiScale(gray_frame, scaleFactor=1.1, minNeighbors=7)

    for (x, y, w, h) in faces_rect:
        ROI = frame[y:y+h, x:x+w]
        ROI = cv2.blur(ROI, (40, 40), cv2.BORDER_DEFAULT)
        frame[y:y+ROI.shape[0], x:x+ROI.shape[1]] = ROI

    return frame

def generate_frames():
    capture = cv2.VideoCapture(0)
    while True:
        ret, frame = capture.read()
        if not ret:
            break

        frame = adjust_brightness(frame)
        frame = blur_faces(frame)

        _, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = BytesIO(buffer.tobytes())
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes.read() + b'\r\n')

@app.get("/")
def read_root():
    return {"message": "Welcome to the facial blurring web app!"}

@app.get('/video_feed')
def video_feed():
    return StreamingResponse(generate_frames(), media_type='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000, debug=True)