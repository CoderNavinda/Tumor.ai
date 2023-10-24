from flask import request, jsonify
from firebase_admin import auth
from flask import  g

# Middleware for user authentication
def authenticate_user():
    user_token = request.json.get('idToken')
    
    try:
        # Verify the Firebase ID token
        decoded_token = auth.verify_id_token(user_token)
        # Extract user data from the decoded token
        user_id = decoded_token['uid']
        email = decoded_token['email']

        # Store user information in the 'g' object for use in routes
        g.user = {'user_id': user_id, 'email': email}
    except ValueError as e:
        return jsonify({'error': str(e)}), 401

