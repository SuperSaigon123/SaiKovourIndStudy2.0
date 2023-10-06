import cv2 as cv
import numpy as np

blank = np.zeros((500, 500, 3), dtype='uint8')
blank[200:300, 300:400] = 255,0,0

cv.rectangle(blank, (0, 0), (250, 250), (255, 0, 0), thickness=2)
cv.imshow("Rectangle", blank)

img = cv.imread('PythonFiles/TestPhotos/jidion.jpg')

def rescaleFrame(frame, scale=0.5):
    width = int(frame.shape[1] * scale)
    height = int(frame.shape[0] * scale)

    dimensions = (width, height)

    return cv.resize(frame, dimensions, interpolation=cv.INTER_AREA)

resized_img = rescaleFrame(img)

cv.imshow("demarcus", resized_img)

gray = cv.cvtColor(resized_img, cv.COLOR_BGR2GRAY)
#cv.imshow("Gray", gray)

blur = cv.blur(resized_img, (40,40), cv.BORDER_DEFAULT)
cv.imshow("Blur", blur)

cv.waitKey(0)