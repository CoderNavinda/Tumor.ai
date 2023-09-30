from flask import Flask, request, jsonify, render_template,session
from flask_cors import CORS
# from dependencies import *
# from unet import *
from dbserver import *
from pymongo import MongoClient
from PIL import Image
import os
import numpy as np
import tensorflow as tf
from keras.models import model_from_json
from email.mime.text import MIMEText
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from routes.contactus import contactus_bp 
from routes.upload import upload_bp

app = Flask(__name__)
CORS(app,supports_credentials=True)

app.register_blueprint(contactus_bp)
app.register_blueprint(upload_bp)

app.secret_key='braintumor'
#initializing MongoDb Database
mongo_uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6"
client = MongoClient(mongo_uri)


#for segmentation
upload_folder = "./static"
device = "cpu"
segment_model = None
path = "./model_state_dict.pt"
data_transforms = None



# #skin cancer
# model =None

# def load_model():
#     global model
#     # Load the model architecture from the JSON file
#     with open('resnet.json', 'r') as json_file:
#         json_model = json_file.read()
#     # Create the model
#     model = model_from_json(json_model)
#     # Load the weights from the H5 file
#     model.load_weights('resnet50.h5')


# def preprocess_image(image):
#     image=image.resize((224,224))
#     image=np.array(image)
#     image = image[:,:,::-1]
#     image =np.expand_dims(image, axis=0)
#     return image


# @app.route('/skincancer', methods=['GET', 'POST'])
# def upload_skin_predict():
#     if request.method=='POST':
#         image_file = request.files['image']
#         if image_file:
#             image_location = os.path.join("./static",image_file.filename) 
#             image_file.save(image_location) 

#             image = Image.open(image_file)
#             image = preprocess_image(image)
#             prediction = model.predict(image)
#             if prediction[0][0] > 0.5:
#                 result = 'Malignant'
#             else:
#                 result = 'Benign'
#         return render_template('skincancer.html', result=result,image_loc =image_location)
#     return render_template('skincancer.html')





# #InsertHistory(client,{'user_id':'test','scan_no':1 , 'date':'2021-09-01',  'report_id':'seg01'})














































# #for segmentation
# def image_loader(loader, image_name):
#     image = Image.open(image_name)
#     image = loader(image).float()
#     image = torch.tensor(image, requires_grad=False)
#     image = image.unsqueeze(0)
#     new_tensor = image.clone()
    
#     return new_tensor

# def process_image(data_transforms, path_name, image_name, filemodel):
#     with torch.no_grad():
#         img = image_loader(data_transforms, path_name)
#         pred = segment_model(img)
#         plt.subplot(1,2,1)                      #original image 
#         plt.imshow(np.squeeze(img.cpu().numpy()).transpose(1,2,0))
#         plt.title('Original Image')

#         plt.subplot(1,2,2)                      #segmented image
#         plt.imshow(np.squeeze(pred.cpu()) > .5)
#         plt.title('Tumour Prediction')
#         plt.savefig("%s/%s-SEGMENTED.png" % (upload_folder, image_name), bbox_inches = "tight")


# @app.route("/braintumor", methods=["GET", "POST"])
# def upload_predict():
#     if request.method == "POST":
#         image_file = request.files["image"]
#         if image_file:                                                          #if an image was recieved
#             image_location = os.path.join(upload_folder,image_file.filename)    #go to ./static folder 
#             image_file.save(image_location)                                     #save the image in ./static folder

#             image_name = os.path.basename(image_location)  #to get only the path name     
#             image_name = image_name.split('.')[0]       #name of image without file extension
            
#             #calling for segmentation
#             process_image(data_transforms, image_location, image_name, segment_model)
#             #calling for classification
#             #predicted_tumor = model_predict(image_location, classifier_model)

#             return render_template("braintumor.html", image_loc = ("%s-SEGMENTED.png" % image_name))
            
#     return render_template("braintumor.html", prediction=0, image_loc=None)


































@app.route("/history/<user_id>", methods=["GET", "POST"])
def history_page(user_id):
    if request.method == "GET":
        history_data = GetHistory(client,user_id)
        print(user_id)
        print(history_data[0])
        if user_id == history_data[0]['user_id']:
            for entry in history_data[0][user_id]:
                del entry['_id']
            return jsonify(history_data[0])
        else:
            return jsonify({'message': 'User not found'}), 404
        


@app.route("/profile/<user_id>", methods=["GET", "POST"])
def profile_page(user_id):
    if request.method == "GET":
        profile_data = GetProfile(client,user_id)
        if user_id in profile_data:
            return jsonify(profile_data[user_id])
        else:
            return jsonify({'message': 'User not found'}), 404
        

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
# Create a session (you can use Flask-Session or Flask-Login for more advanced sessions)
    session['user'] = email
    # print(session['user'])
    return jsonify({'message': 'Login successful'}), 200
    
@app.route('/logout', methods=['GET'])
def logout():
    # Remove the username from the session (logout)
    session.pop('user', None)
    return jsonify({'message': 'Logout successful'}), 200


@app.route("/", methods=["GET", "POST"])
def home():
    return render_template('index.html')

if __name__ == "__main__":
    # segment_model = UNet().to(device)   #loading the whole model architecture
    # segment_model.load_state_dict(torch.load(path, map_location=torch.device('cpu')))   #loading the pre trained weights

    # segment_model.eval()    #switch the model from training mode to evaluation mode

    # data_transforms = transforms.Compose([transforms.Resize(256),transforms.ToTensor()])


    # load_model() #skin cancer detection
    app.run(host="0.0.0.0", port=12000, debug=True)











































# #for segmentation
# def image_loader(loader, image_name):
#     image = Image.open(image_name)
#     image = loader(image).float()
#     image = torch.tensor(image, requires_grad=False)
#     image = image.unsqueeze(0)
#     new_tensor = image.clone()
    
#     return new_tensor

# def process_image(data_transforms, path_name, image_name, filemodel):
#     with torch.no_grad():
#         img = image_loader(data_transforms, path_name)
#         pred = segment_model(img)
#         plt.subplot(1,2,1)                      #original image 
#         plt.imshow(np.squeeze(img.cpu().numpy()).transpose(1,2,0))
#         plt.title('Original Image')

#         plt.subplot(1,2,2)                      #segmented image
#         plt.imshow(np.squeeze(pred.cpu()) > .5)
#         plt.title('Tumour Prediction')
#         plt.savefig("%s/%s-SEGMENTED.png" % (upload_folder, image_name), bbox_inches = "tight")


# @app.route("/api/data", methods=["GET", "POST"])
# def upload_predict():
#     if request.method == "POST":
#         #  # Get the Base64 encoded image from the request
#         # base64_data = request.json.get('base64_image')

#         # # Decode the Base64 string to obtain the image data
#         # image_data = base64.b64decode(base64_data)

#         # # Convert the image data to a PIL Image object
#         # image = Image.open(io.BytesIO(image_data))

#         # # Ensure the image is in RGB mode (TIFF doesn't support all modes)
#         # image = image.convert('RGB')

#         # # Create a file-like object to save the TIFF image
#         # tiff_buffer = io.BytesIO()

#         # # Save the image as TIFF to the file-like object
#         # image.save(tiff_buffer, format='TIFF')
#         image_file = request.files["image"]
#         if image_file:                                                          #if an image was recieved
#             image_location = os.path.join(upload_folder,image_file.filename)    #go to ./static folder 
#             image_file.save(image_location)                                     #save the image in ./static folder

#             image_name = os.path.basename(image_location)  #to get only the path name     
#             image_name = image_name.split('.')[0]       #name of image without file extension
            
#             #calling for segmentation
#             process_image(data_transforms, image_location, image_name, segment_model)
#             #calling for classification
#             #predicted_tumor = model_predict(image_location, classifier_model)
#             image_loc  = ("%s-SEGMENTED.png" % image_name)
#             return jsonify({'image_loc': image_loc}), 200
#         image_loc  = ("%s-SEGMENTED.png" % image_name)
#         return jsonify({'image_loc': image_loc}), 200
#     else:
#         return jsonify({'image_loc': 'none'}), 200



# if __name__ == '__main__':
#     segment_model = UNet().to(device)   #loading the whole model architecture
#     segment_model.load_state_dict(torch.load(path, map_location=torch.device('cpu')))   #loading the pre trained weights

#     segment_model.eval()    #switch the model from training mode to evaluation mode

#     data_transforms = transforms.Compose([transforms.Resize(256),transforms.ToTensor()])
#     app.run(debug=True)






































# Registration route
# @app.route('/register', methods=['POST'])
# def register():
#     data = request.json
#     email = data['email']
#     password = data['password']

#     try:
#         user = auth.create_user(
#             email=email,
#             password=password
#         )
#         return jsonify({'message': 'User registered successfully'}), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 400

# # Login route
# @app.route('/login', methods=['POST'])
# def login():
#     data = request.json
#     email = data['email']
#     password = data['password']
#     try:
#         user = pb.auth().sign_in_with_email_and_password(email, password)
#         return jsonify({'message': 'Login successful', 'idToken': user['idToken']}), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 401


































# from flask import Flask, jsonify
# from flask_cors import CORS

# app = Flask(__name__)

# # Configure CORS on the Flask app instance
# CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

@app.route('/')
def hello_world():
    return 'Hello, Flask!'

@app.route('/api/data', methods=['GET'])
def get_data():
    data = [
    {"id": 1, "name": "Item 1"},
    {"id": 2, "name": "Item 2"},
    {"id": 3, "name": "Item 3"},
]
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
