from flask import Blueprint, jsonify, request
import os
from models.skincancer.skincancer import *
skincancer_bp = Blueprint('skincancer', __name__)







@skincancer_bp.route('/api/skincancer', methods=['GET', 'POST'])
def upload_skin_predict():
    if request.method=='POST':
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        image_file = request.files['image']


        if image_file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        
        if image_file:
            image_location = os.path.join("./static",image_file.filename) 
            image_file.save(image_location) 

            image = Image.open(image_file)
            image = preprocess_image(image)
            prediction = model.predict(image)
            if prediction[0][0] > 0.5:
                result = 'Malignant'
            else:
                result = 'Benign'
        return jsonify({'message': 'File uploaded successfully', 'result': result, 'segmented_image_path': image_location})
    return jsonify({'error': 'no gets'}), 500
