from flask import Flask, request, jsonify, send_file
from pdf2docx import Converter
import os


app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
OUTPUT_FOLDER = 'outputs'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

@app.route('/')
def main(): 
    return 'Hello world'

@app.route('/convert', methods=['POST'])
def convert_Pdf_word():
    # Check if the post request has the file part
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    # Check if the file is valid
    file = request.files['file']
    if file.filename == '':
        return jsonify({{'error': 'No selected file'}})
    # check if the file is pdf
    if file and file.filename.endswith('.pdf'):
        filename = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filename)
        word_filename = file.filename.rsplit('.', 1)[0] + '.docx'
        word_path = os.path.join(OUTPUT_FOLDER, word_filename)
        try:
            cv = Converter(filename)
            cv.convert(word_path, start=0, end=None)
            cv.close()
            return send_file(word_path, as_attachment=True, download_name=word_filename)
            os.remove(filename)
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Invalid file type'}), 400


if __name__ == '__main__':
    app.run(debug=True)
