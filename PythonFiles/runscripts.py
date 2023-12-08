from fastapi import FastAPI, File, UploadFile
from fastapi.responses import StreamingResponse
import cv2
import numpy as np
from io import BytesIO

app = FastAPI()

def process_media(media_bytes, media_type):
    image = cv2.imdecode(np.frombuffer(media_bytes, dtype=np.uint8), 1)

    if media_type == 'photo':
        # Face detection and blurring for photos
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        haar_cascade = cv2.CascadeClassifier('PythonFiles/haar_face.xml')
        faces_rect = haar_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=3)

        for (x, y, w, h) in faces_rect:
            ROI = image[y:y+h, x:x+w]
            ROI = cv2.blur(ROI, (40, 40), cv2.BORDER_DEFAULT)
            image[y:y+ROI.shape[0], x:x+ROI.shape[1]] = ROI

    elif media_type == 'video':
        # Face detection and blurring for each frame of a video
        frames = []
        cap = cv2.VideoCapture(BytesIO(media_bytes))

        while True:
            ret, frame = cap.read()
            if not ret:
                break

            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces_rect = haar_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=3)

            for (x, y, w, h) in faces_rect:
                ROI = frame[y:y+h, x:x+w]
                ROI = cv2.blur(ROI, (40, 40), cv2.BORDER_DEFAULT)
                frame[y:y+ROI.shape[0], x:x+ROI.shape[1]] = ROI

            frames.append(frame)

        cap.release()

        # Encode the processed frames into a video
        height, width, _ = frames[0].shape
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        out = cv2.VideoWriter('output_video.mp4', fourcc, 20.0, (width, height))
        for frame in frames:
            out.write(frame)
        out.release()

        # Read the processed video file and convert it to bytes
        with open('output_video.mp4', 'rb') as video_file:
            media_bytes = video_file.read()

    _, processed_image_bytes = cv2.imencode('.jpg', image)
    return processed_image_bytes

@app.post("/process_media")
async def process_media_route(file: UploadFile = File(...)):
    media_bytes = await file.read()
    media_type = file.content_type.split('/')[0]  # 'image' or 'video'
    processed_media_bytes = process_media(media_bytes, media_type)
    return StreamingResponse(BytesIO(processed_media_bytes), media_type=f'{media_type}/jpeg')