from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import cv2
import base64
import numpy as np
import json
import threading
import time
from datetime import datetime
from collections import defaultdict, deque
from pathlib import Path
import os
from simple_detection import get_detector

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key'
CORS(app, origins=['http://localhost:3000'])
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='eventlet')

# Initialize face detection system
detection_system = None

# Global variables for statistics
detection_stats = {
    'total_faces_detected': 0,
    'current_faces': 0,
    'age_distribution': defaultdict(int),
    'gender_distribution': defaultdict(int),
    'detections_per_minute': deque(maxlen=60),
    'last_detection_time': None
}

# Global detection system instance
detection_system = None

def load_models():
    """Load detection system"""
    global detection_system
    print("Loading face detection system...")
    detection_system = get_detector()
    print("Detection system loaded successfully!")

def process_frame(frame_data):
    """Process video frame for face detection and demographic analysis"""
    global detection_system
    
    try:
        # Decode base64 image
        img_data = base64.b64decode(frame_data.split(',')[1])
        nparr = np.frombuffer(img_data, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if frame is None:
            return None
        
        # Process frame with detection system
        if detection_system is None:
            detection_system = get_detector()
        
        results = detection_system.process_frame(frame)
        
        detections = []
        current_face_count = len(results)
        
        for result in results:
            # Extract detection data
            bbox = result['bbox']
            age = result['age']
            gender = result['gender']
            confidence = result['confidence']
            
            detection_data = {
                'bbox': bbox,
                'age': age,
                'gender': gender,
                'confidence': float(confidence),
                'timestamp': datetime.now().isoformat()
            }
            
            detections.append(detection_data)
            
            # Update statistics
            detection_stats['age_distribution'][f"{age//10*10}-{age//10*10+9}"] += 1
            detection_stats['gender_distribution'][gender] += 1
            
            # Draw bounding box and labels
            x, y, width, height = bbox['x'], bbox['y'], bbox['width'], bbox['height']
            cv2.rectangle(frame, (x, y), (x + width, y + height), (0, 255, 0), 2)
            cv2.putText(frame, f'{gender}, {age}', (x, y - 10), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
        
        # Update global statistics
        detection_stats['current_faces'] = current_face_count
        detection_stats['total_faces_detected'] += current_face_count
        detection_stats['last_detection_time'] = datetime.now().isoformat()
        detection_stats['detections_per_minute'].append(current_face_count)
        
        # Encode processed frame back to base64
        _, buffer = cv2.imencode('.jpg', frame)
        processed_frame = base64.b64encode(buffer).decode('utf-8')
        
        return {
            'processed_frame': f"data:image/jpeg;base64,{processed_frame}",
            'detections': detections,
            'face_count': current_face_count,
            'timestamp': datetime.now().isoformat()
        }
        
    except Exception as e:
        print(f"Error processing frame: {str(e)}")
        return None

@app.route('/')
def index():
    return jsonify({"message": "CCTV Age and Gender Detection API"})

@app.route('/api/stats')
def get_stats():
    """Get current detection statistics"""
    avg_detections = sum(detection_stats['detections_per_minute']) / max(len(detection_stats['detections_per_minute']), 1)
    
    stats = {
        'total_faces': detection_stats['total_faces_detected'],
        'current_faces': detection_stats['current_faces'],
        'avg_detections_per_minute': round(avg_detections, 2),
        'age_distribution': dict(detection_stats['age_distribution']),
        'gender_distribution': dict(detection_stats['gender_distribution']),
        'last_detection': detection_stats['last_detection_time']
    }
    
    return jsonify(stats)

@app.route('/api/reset-stats', methods=['POST'])
def reset_stats():
    """Reset detection statistics"""
    global detection_stats
    detection_stats = {
        'total_faces_detected': 0,
        'current_faces': 0,
        'age_distribution': defaultdict(int),
        'gender_distribution': defaultdict(int),
        'detections_per_minute': deque(maxlen=60),
        'last_detection_time': None
    }
    return jsonify({"message": "Statistics reset successfully"})

@socketio.on('connect')
def handle_connect():
    print('Client connected')
    emit('status', {'message': 'Connected to detection server'})

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('video_frame')
def handle_video_frame(data):
    """Handle incoming video frame from client"""
    result = process_frame(data['frame'])
    if result:
        emit('detection_result', result)

if __name__ == '__main__':
    # Create models directory if it doesn't exist
    os.makedirs('models', exist_ok=True)
    
    # Load detection system
    load_models()
    
    # Start the server
    print("Starting CCTV Age and Gender Detection Server...")
    print("Server running on http://localhost:5000")
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)