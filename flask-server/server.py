from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from dbserver import *
from routes.contactus import contactus_bp 
from routes.upload import upload_bp
from routes.skincancer import skincancer_bp
from routes.login import login_bp
from routes.logout import logout_bp


app = Flask(__name__)
CORS(app,supports_credentials=True)

app.register_blueprint(contactus_bp)
# app.register_blueprint(upload_bp)
# app.register_blueprint(skincancer_bp)
app.register_blueprint(login_bp)
app.register_blueprint(logout_bp)


#for segmentation
upload_folder = "./static"
device = "cpu"
segment_model = None
path = "./model_state_dict.pt"
data_transforms = None



cred = credentials.Certificate('tumoridsys-firebase-adminsdk-dn5kq-ee7ef16c4d.json')
firebase_admin.initialize_app(cred)





@app.route("/", methods=["GET", "POST"])
def home():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=12000, debug=True)


if __name__ == '__main__':
    app.run(debug=True)
