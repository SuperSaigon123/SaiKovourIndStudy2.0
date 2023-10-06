import cv2 as cv
import numpy as np

from tkinter import *
from tkinter import messagebox

window=Tk()
window.title('Upload File')
window.geometry('500x500')

def onClick():
    myLabel = Label(window, text="This is a test")
    myLabel.pack()

theButton = Button(window, text="Click Me!", command=onClick)
theButton.pack()


window.mainloop()