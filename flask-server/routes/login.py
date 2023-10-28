from flask import Blueprint, jsonify, request, make_response
from flask import  g
from middleware.authentication import *
login_bp = Blueprint('login', __name__)




@login_bp.route('/api/login', methods=['OPTIONS', 'POST'])
def login():
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        return response
    elif request.method=='POST':
        authenticate_user()
        uid = g.user['user_id']
        email = g.user['email']
        return jsonify({'message': 'User logged in successfully', 'uid': uid, 'email': email})
        
