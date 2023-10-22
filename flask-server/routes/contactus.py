# routes/contactus.py
from flask import Blueprint, jsonify, request
from email.mime.text import MIMEText
import smtplib
from email.mime.text import MIMEText
import json
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication



with open('E:\\Engineering\\Semester 5\\SE Project\\TumorAI\\Tumor.ai\\flask-server\\routes\\credentials.json', 'r') as credentials_file:
    credentials = json.load(credentials_file)


# Create a Blueprint for contactus
contactus_bp = Blueprint('contactus', __name__)

smtp_server = credentials['smtp_server']
smtp_port = credentials['smtp_port']
smtp_username = credentials['smtp_username']
smtp_password = credentials['smtp_password']
subject = credentials['subject']

# Define route handlers for /api/contactus

@contactus_bp.route('/api/contactus', methods=['GET'])
def get_contactus():
    return jsonify({"contactus": 'hello'})


@contactus_bp.route('/api/contactus', methods=['POST'])
def add_contactus():
    global smtp_server
    try:

        # # Extract user input data
        # user_name = 'navinda'
        # user_email = 'navinda.20@cse.mrt.ac.lk'
        # user_message = 'test message'
        data = request.get_json()  # Get JSON data from the POST request

        user_name = data.get('name')
        user_email = data.get('email')
        user_message = data.get('message')
        # Check if any of the fields are missing
        if not user_name or not user_email or not user_message:
            return jsonify({'error': 'Incomplete data provided'}), 400

        # Customize the email response message with the user's name
        message = f"Thank you for reaching out, {user_name}!\n\n"  # Include the user's name in the message
        message += "We appreciate your inquiry and will get back to you as soon as possible. "
        message += "If you have any further questions or need immediate assistance, "
        message += "please feel free to contact us at +94 77 39 35 182."
        print(message)
        # Compose the email message
        email_msg = MIMEMultipart()
        email_msg['From'] = smtp_username
        email_msg['To'] = user_email
        email_msg['Subject'] = subject
        email_msg.attach(MIMEText(message + '\n'+'\n' + user_message, 'plain'))

        # Create SMTP server session
        smtp_server = smtplib.SMTP(smtp_server, smtp_port)
        smtp_server.starttls()
        smtp_server.login(smtp_username, smtp_password)
        smtp_server.sendmail(smtp_username, user_email, email_msg.as_string())
        smtp_server.quit()

        return jsonify({'message': 'Email sent successfully'})

    except Exception as e:
        return jsonify({'error': f'Error sending email: {str(e)}'}), 500
