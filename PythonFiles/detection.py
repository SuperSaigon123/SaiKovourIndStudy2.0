import cv2 as cv
import numpy as np
import logging

img = cv.imread('TestPhotos/grouppicture.jpg')
#cv.imshow("Demarcus", img)

gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
cv.imshow("Gray Group", gray)

haar_cascade = cv.CascadeClassifier('haar_face.xml')

faces_rect = haar_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=3)

print(faces_rect)

print(f'Number of faces found = {len(faces_rect)}')

for (x, y, w, h) in faces_rect:
    cv.rectangle(img, (x, y), (x+w, y+h), (255,0,0), thickness=2)
    ROI = img[y:y+h, x:x+w]
    ROI = cv.blur(ROI, (40,40), cv.BORDER_DEFAULT)

    img[y:y+ROI.shape[0], x:x+ROI.shape[1]] = ROI

cv.imshow("Face Blurred", img)

cv.waitKey(0)