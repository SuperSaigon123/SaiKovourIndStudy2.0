import numpy as np
import cv2 as cv

capture = cv.VideoCapture(0)

while True:
    ret, frame = capture.read()

    grayVid = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)

    haar_cascade = cv.CascadeClassifier('haar_face.xml')

    faces_rect = haar_cascade.detectMultiScale(grayVid, scaleFactor=1.1, minNeighbors=7)

    for (x, y, w, h) in faces_rect:
        cv.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0))
        ROI = frame[y:y+h, x:x+w]
        ROI = cv.blur(ROI, (40,40), cv.BORDER_DEFAULT)

        frame[y:y+ROI.shape[0], x:x+ROI.shape[1]] = ROI

    cv.imshow('frame', frame)

    if cv.waitKey(1) == ord(' '):
        break

capture.release()