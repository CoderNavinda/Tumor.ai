from flask import Blueprint, jsonify, request
from flask import  g
from middleware.authentication import *
login_bp = Blueprint('login', __name__)




@login_bp.route('/api/login', methods=['GET', 'POST'])
def login():
    if request.method=='POST':
        authenticate_user()
        uid = g.user['user_id']
        email = g.user['email']
        return jsonify({'message': 'User logged in successfully', 'uid': uid, 'email': email})
        
