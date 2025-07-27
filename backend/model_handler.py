import tensorflow as tf
import numpy as np
import cv2
import os
import gdown
from pathlib import Path

class AgeGenderPredictor:
    def __init__(self, models_dir="models"):
        self.models_dir = Path(models_dir)
        self.models_dir.mkdir(exist_ok=True)
        
        self.age_model = None
        self.gender_model = None
        self.age_interpreter = None
        self.gender_interpreter = None
        
        # Age groups for classification
        self.age_groups = ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70+']
        self.gender_classes = ['Male', 'Female']
        
        self.input_size = (64, 64)  # Standard input size for lightweight models
        
    def download_models(self):
        """Download pre-trained models if not available"""
        print("Checking for pre-trained models...")
        
        # For demo purposes, we'll create simple TensorFlow Lite models
        # In production, you would download actual pre-trained models
        
        age_model_path = self.models_dir / "age_model.tflite"
        gender_model_path = self.models_dir / "gender_model.tflite"
        
        if not age_model_path.exists():
            print("Creating demo age classification model...")
            self._create_demo_age_model(age_model_path)
            
        if not gender_model_path.exists():
            print("Creating demo gender classification model...")
            self._create_demo_gender_model(gender_model_path)
            
        return age_model_path, gender_model_path
    
    def _create_demo_age_model(self, model_path):
        """Create a demo age classification model"""
        # Create a simple CNN model for age classification
        model = tf.keras.Sequential([
            tf.keras.layers.Input(shape=(64, 64, 3)),
            tf.keras.layers.Conv2D(32, 3, activation='relu'),
            tf.keras.layers.MaxPooling2D(),
            tf.keras.layers.Conv2D(64, 3, activation='relu'),
            tf.keras.layers.MaxPooling2D(),
            tf.keras.layers.Conv2D(128, 3, activation='relu'),
            tf.keras.layers.GlobalAveragePooling2D(),
            tf.keras.layers.Dense(128, activation='relu'),
            tf.keras.layers.Dropout(0.5),
            tf.keras.layers.Dense(len(self.age_groups), activation='softmax')
        ])
        
        model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
        
        # Convert to TensorFlow Lite
        converter = tf.lite.TFLiteConverter.from_keras_model(model)
        converter.optimizations = [tf.lite.Optimize.DEFAULT]
        tflite_model = converter.convert()
        
        with open(model_path, 'wb') as f:
            f.write(tflite_model)
            
        print(f"Demo age model saved to {model_path}")
    
    def _create_demo_gender_model(self, model_path):
        """Create a demo gender classification model"""
        # Create a simple CNN model for gender classification
        model = tf.keras.Sequential([
            tf.keras.layers.Input(shape=(64, 64, 3)),
            tf.keras.layers.Conv2D(32, 3, activation='relu'),
            tf.keras.layers.MaxPooling2D(),
            tf.keras.layers.Conv2D(64, 3, activation='relu'),
            tf.keras.layers.MaxPooling2D(),
            tf.keras.layers.Conv2D(128, 3, activation='relu'),
            tf.keras.layers.GlobalAveragePooling2D(),
            tf.keras.layers.Dense(128, activation='relu'),
            tf.keras.layers.Dropout(0.5),
            tf.keras.layers.Dense(len(self.gender_classes), activation='softmax')
        ])
        
        model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
        
        # Convert to TensorFlow Lite
        converter = tf.lite.TFLiteConverter.from_keras_model(model)
        converter.optimizations = [tf.lite.Optimize.DEFAULT]
        tflite_model = converter.convert()
        
        with open(model_path, 'wb') as f:
            f.write(tflite_model)
            
        print(f"Demo gender model saved to {model_path}")
    
    def load_models(self):
        """Load TensorFlow Lite models"""
        try:
            age_model_path, gender_model_path = self.download_models()
            
            # Load age model
            self.age_interpreter = tf.lite.Interpreter(model_path=str(age_model_path))
            self.age_interpreter.allocate_tensors()
            
            # Load gender model
            self.gender_interpreter = tf.lite.Interpreter(model_path=str(gender_model_path))
            self.gender_interpreter.allocate_tensors()
            
            print("Models loaded successfully!")
            return True
            
        except Exception as e:
            print(f"Error loading models: {str(e)}")
            return False
    
    def preprocess_face(self, face_image):
        """Preprocess face image for model input"""
        try:
            # Resize to model input size
            face_resized = cv2.resize(face_image, self.input_size)
            
            # Convert BGR to RGB
            face_rgb = cv2.cvtColor(face_resized, cv2.COLOR_BGR2RGB)
            
            # Normalize pixel values to [0, 1]
            face_normalized = face_rgb.astype(np.float32) / 255.0
            
            # Add batch dimension
            face_batch = np.expand_dims(face_normalized, axis=0)
            
            return face_batch
            
        except Exception as e:
            print(f"Error preprocessing face: {str(e)}")
            return None
    
    def predict_age(self, face_image):
        """Predict age group from face image"""
        try:
            if self.age_interpreter is None:
                return "Unknown", 0.0
            
            # Preprocess the face
            processed_face = self.preprocess_face(face_image)
            if processed_face is None:
                return "Unknown", 0.0
            
            # Get input and output details
            input_details = self.age_interpreter.get_input_details()
            output_details = self.age_interpreter.get_output_details()
            
            # Set input tensor
            self.age_interpreter.set_tensor(input_details[0]['index'], processed_face)
            
            # Run inference
            self.age_interpreter.invoke()
            
            # Get output
            output_data = self.age_interpreter.get_tensor(output_details[0]['index'])
            
            # Get predicted class and confidence
            predicted_class = np.argmax(output_data[0])
            confidence = float(np.max(output_data[0]))
            
            age_group = self.age_groups[predicted_class]
            
            return age_group, confidence
            
        except Exception as e:
            print(f"Error predicting age: {str(e)}")
            return "Unknown", 0.0
    
    def predict_gender(self, face_image):
        """Predict gender from face image"""
        try:
            if self.gender_interpreter is None:
                return "Unknown", 0.0
            
            # Preprocess the face
            processed_face = self.preprocess_face(face_image)
            if processed_face is None:
                return "Unknown", 0.0
            
            # Get input and output details
            input_details = self.gender_interpreter.get_input_details()
            output_details = self.gender_interpreter.get_output_details()
            
            # Set input tensor
            self.gender_interpreter.set_tensor(input_details[0]['index'], processed_face)
            
            # Run inference
            self.gender_interpreter.invoke()
            
            # Get output
            output_data = self.gender_interpreter.get_tensor(output_details[0]['index'])
            
            # Get predicted class and confidence
            predicted_class = np.argmax(output_data[0])
            confidence = float(np.max(output_data[0]))
            
            gender = self.gender_classes[predicted_class]
            
            return gender, confidence
            
        except Exception as e:
            print(f"Error predicting gender: {str(e)}")
            return "Unknown", 0.0
    
    def predict_age_gender(self, face_image):
        """Predict both age and gender from face image"""
        age_group, age_confidence = self.predict_age(face_image)
        gender, gender_confidence = self.predict_gender(face_image)
        
        # For demo purposes, convert age group to approximate age
        age_mapping = {
            '0-9': 5, '10-19': 15, '20-29': 25, '30-39': 35,
            '40-49': 45, '50-59': 55, '60-69': 65, '70+': 75
        }
        
        age = age_mapping.get(age_group, 30)
        
        # Use average confidence
        avg_confidence = (age_confidence + gender_confidence) / 2
        
        return age, gender, avg_confidence, age_group

# Global predictor instance
predictor = None

def get_predictor():
    """Get global predictor instance"""
    global predictor
    if predictor is None:
        predictor = AgeGenderPredictor()
        predictor.load_models()
    return predictor