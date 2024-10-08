from flask import Blueprint, request, jsonify, current_app, send_from_directory
from werkzeug.utils import secure_filename
import os

upload_bp = Blueprint('upload', __name__)

@upload_bp.route('/upload/', methods=['POST'])
def upload_file():
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        
        return jsonify({'message': 'File uploaded successfully', 'filename': filename}), 200
    
@upload_bp.route('/upload/products', methods=['POST'])
def upload_file_products():
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        filename = secure_filename(file.filename)
        # Create the products subdirectory if it doesn't exist
        product_folder = os.path.join(current_app.config['UPLOAD_FOLDER'], 'products')
        os.makedirs(product_folder, exist_ok=True)
        
        # Save the file in the products subdirectory
        file_path = os.path.join(product_folder, filename)
        file.save(file_path)
        
        return jsonify({'message': 'File uploaded successfully', 'filename': filename}), 200
@upload_bp.route('/uploads/<path:filename>')
def uploaded_file(filename):
    return send_from_directory(current_app.config['UPLOAD_FOLDER'], filename)


