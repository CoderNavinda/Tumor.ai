from flask import Blueprint, jsonify, request
from flask import  g
from middleware.authentication import *
logout_bp = Blueprint('logout', __name__)




@logout_bp.route('/api/logout', methods=['GET', 'POST'])
def logout():
   if 'user' in g:
        del g.user
        return jsonify({'message': 'User logged out successfully'}), 200