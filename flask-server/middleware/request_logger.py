from flask import request

# Middleware for logging requests
def log_requests():
    print(f'Received a {request.method} request to {request.url}')
    return None
