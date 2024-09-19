
from flask import Flask, render_template, request, jsonify, send_file, redirect, url_for, session
from pymongo import MongoClient
import bcrypt
from flask_session import Session
from flask_cors import CORS
import uuid
from pdf2docx import Converter
import os
from dotenv import load_dotenv

# Load environment variables from .env file (if used locally)
load_dotenv()

app = Flask(__name__, template_folder='src')
CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'

# Session configuration
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your_secret_key')  # Use environment variable for secret key
Session(app)

# MongoDB configuration
MONGO_URI = os.getenv('MONGO_URI')
if not MONGO_URI:
    raise ValueError("No MongoDB URI provided in environment variables")
client = MongoClient(MONGO_URI)
db = client.user_db
users_collection = db.users
trials_collection = db.trials

# Directories for file uploads and outputs
UPLOAD_FOLDER = 'uploads'
OUTPUT_FOLDER = 'outputs'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

@app.route('/submit', methods=['POST'])
def submit():
    return jsonify({'message': 'File converted successfully'}), 200

@app.route('/')
def main():
    data = {
        'name': "jack",
        'age': '32'
    } 
    return jsonify(data)

@app.route('/rich')
def rich(): 
    return 'Rich man it you'

@app.route('/Hi', methods=['GET'])
def hi():
    name = request.args.get('name')
    return jsonify({"name": name})

@app.route('/check', methods=['POST'])
def check_file_type():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Get MIME type
    file_type = file.content_type

    return jsonify({
        "filename": file.filename,
        "content_type": file_type
    }), 200

@app.route('/convert', methods=['POST'])
def convert_pdf_to_word():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and file.filename.endswith('.pdf'):
        filename = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filename)
        word_filename = file.filename.rsplit('.', 1)[0] + '.docx'
        word_path = os.path.join(OUTPUT_FOLDER, word_filename)
        try:
            cv = Converter(filename)
            cv.convert(word_path, start=0, end=None)
            cv.close()
            return send_file(
                word_path,
                as_attachment=True,
                download_name=word_filename,
                mimetype='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            )
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Invalid file type'}), 400

@app.route('/register', methods=['POST'])
def sign_up():
    data = request.get_json(force=True)
    if not data:
        return jsonify({"error": "No data provided"}), 400

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400

    user = users_collection.find_one({"username": username})
    if user:
        return jsonify({"error": "User already exists"}), 400

    hash_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    new_user = {"username": username, "password": hash_password}
    users_collection.insert_one(new_user)
    return jsonify({"message": "Registration successful"}), 200

@app.route('/login', methods=['POST'])
def sign_in():
    data = request.get_json(force=True)
    username = data.get('username')
    password = data.get('password')
    
    if username and password:
        user = users_collection.find_one({"username": username})
        if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
            session['username'] = username
            return jsonify({"message": "Login successful"}), 200
        else:
            return jsonify({"error": "Invalid username or password"}), 401
    else:
        return jsonify({"error": "Username and password required"}), 400

@app.route('/user', methods=['GET'])
def get_user():
    if 'username' not in session:
        return jsonify({"error": "Unauthorized"}), 401
    
    username = session['username']
    user = users_collection.find_one({"username": username})
    if user:
        return jsonify({"username": user['username']}), 200
    return jsonify({"error": "User not found"}), 404

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('username', None)
    return jsonify({"message": "Logout successful"}), 200

@app.route('/trail', methods=['POST'])
def trail():
    if 'user_id' not in session:
        user_id = str(uuid.uuid4())
        session['user_id'] = user_id
    else:
        user_id = session['user_id']

    if trials_collection.find_one({"user_id": user_id}):
        return jsonify({"error": "Trial already used, please login"}), 403

    trials_collection.insert_one({"user_id": user_id, "trial_used": True})
    return jsonify({"message": "File uploaded and processed successfully"}), 200

if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 5000))  # Default to 5000 if not set
    app.run(host='0.0.0.0', port=PORT)
