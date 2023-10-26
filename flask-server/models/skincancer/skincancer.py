from flask import Flask, request, jsonify, render_template
from PIL import Image
import numpy as np
from keras.models import model_from_json




#skin cancer
model =None

def load_model():
    global model
    # Load the model architecture from the JSON file
    with open('E:/Engineering/Semester 5/SE Project/TumorAI/Tumor.ai/flask-server/models/skincancer/resnet.json', 'r') as json_file:
        json_model = json_file.read()
    # Create the model
    model = model_from_json(json_model)
    # Load the weights from the H5 file
    model.load_weights('E:/Engineering/Semester 5/SE Project/TumorAI/Tumor.ai/flask-server/models/skincancer/resnet50.h5')


def preprocess_image(image):
    image=image.resize((224,224))
    image=np.array(image)
    image = image[:,:,::-1]
    image =np.expand_dims(image, axis=0)
    return image



load_model()

