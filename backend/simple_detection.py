"""
Simplified face detection using OpenCV Haar Cascades
This replaces MediaPipe for compatibility with Python 3.13
"""

import cv2
import numpy as np
import os
from pathlib import Path

class SimpleFaceDetector:
    def __init__(self):
        self.face_cascade = None
        self.load_cascade()
        
    def load_cascade(self):
        """Load OpenCV's pre-trained Haar cascade for face detection"""
        try:
            # Try to load the face cascade
            cascade_path = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
            self.face_cascade = cv2.CascadeClassifier(cascade_path)
            
            if self.face_cascade.empty():
                print("Warning: Could not load face cascade")
                return False
                
            print("Face cascade loaded successfully")
            return True
            
        except Exception as e:
            print(f"Error loading face cascade: {str(e)}")
            return False
    
    def detect_faces(self, frame):
        """
        Detect faces in the given frame
        Returns list of face bounding boxes
        """
        if self.face_cascade is None or self.face_cascade.empty():
            return []
        
        try:
            # Convert to grayscale for detection
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            
            # Detect faces
            faces = self.face_cascade.detectMultiScale(
                gray,
                scaleFactor=1.1,
                minNeighbors=5,
                minSize=(30, 30),
                flags=cv2.CASCADE_SCALE_IMAGE
            )
            
            # Convert to list of dictionaries for consistency
            detections = []
            for (x, y, w, h) in faces:
                detections.append({
                    'x': int(x),
                    'y': int(y), 
                    'width': int(w),
                    'height': int(h),
                    'confidence': 0.8  # Default confidence for Haar cascades
                })
            
            return detections
            
        except Exception as e:
            print(f"Error detecting faces: {str(e)}")
            return []

class SimpleAgeGenderPredictor:
    """Simple age and gender predictor using randomization for demo"""
    
    def __init__(self):
        self.age_groups = ['0-12', '13-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70+']
        self.genders = ['Male', 'Female']
        
    def predict_age_gender(self, face_image):
        """
        Predict age and gender from face image
        For demo purposes, this uses randomization
        """
        # Generate demo predictions
        age = np.random.randint(18, 70)
        gender = np.random.choice(self.genders)
        confidence = np.random.uniform(0.7, 0.95)
        
        # Map age to group
        if age < 13:
            age_group = "0-12"
        elif age < 20:
            age_group = "13-19"
        elif age < 30:
            age_group = "20-29"
        elif age < 40:
            age_group = "30-39"
        elif age < 50:
            age_group = "40-49"
        elif age < 60:
            age_group = "50-59"
        elif age < 70:
            age_group = "60-69"
        else:
            age_group = "70+"
            
        return age, gender, confidence, age_group

class IntegratedDetectionSystem:
    """Integrated system combining face detection and age/gender prediction"""
    
    def __init__(self):
        self.face_detector = SimpleFaceDetector()
        self.age_gender_predictor = SimpleAgeGenderPredictor()
        
    def process_frame(self, frame):
        """
        Process a video frame to detect faces and predict demographics
        Returns list of detections with age/gender predictions
        """
        try:
            if frame is None:
                return []
            
            # Detect faces
            face_detections = self.face_detector.detect_faces(frame)
            
            results = []
            for detection in face_detections:
                # Extract face region
                x, y, w, h = detection['x'], detection['y'], detection['width'], detection['height']
                face_roi = frame[y:y+h, x:x+w]
                
                if face_roi.size > 0:
                    # Predict age and gender
                    age, gender, confidence, age_group = self.age_gender_predictor.predict_age_gender(face_roi)
                    
                    result = {
                        'bbox': {
                            'x': x,
                            'y': y, 
                            'width': w,
                            'height': h
                        },
                        'age': age,
                        'gender': gender,
                        'confidence': confidence,
                        'age_group': age_group
                    }
                    results.append(result)
            
            return results
            
        except Exception as e:
            print(f"Error processing frame: {str(e)}")
            return []

# Global detector instance
detector = None

def get_detector():
    """Get global detector instance"""
    global detector
    if detector is None:
        detector = IntegratedDetectionSystem()
    return detector