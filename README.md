# CCTV-based Age and Gender Detection System

A real-time, lightweight AI system for detecting faces and estimating age and gender from CCTV/webcam feeds. Built with Python, Flask, TensorFlow Lite, and React.js for enterprise-ready deployment.

## 🚀 Features

- **Real-time face detection** using MediaPipe (up to 10+ FPS on CPU)
- **Age and gender estimation** with lightweight TensorFlow Lite models
- **Multi-face support** (up to 4 faces simultaneously)
- **Web-based interface** with React.js frontend
- **Live statistics dashboard** with real-time charts
- **WebRTC integration** for browser-based webcam access
- **CPU-optimized** for edge deployment
- **Enterprise-ready** with Flask backend and WebSocket communication

## 🎯 Use Cases

- Smart retail analytics
- Public transport monitoring
- Event management and crowd analysis
- Security and surveillance systems
- Customer demographic analysis

## 🛠️ Technology Stack

### Backend
- **Python 3.8+**
- **Flask** - Web framework
- **MediaPipe** - Face detection
- **TensorFlow Lite** - Age/gender classification
- **OpenCV** - Image processing
- **Socket.IO** - Real-time communication

### Frontend
- **React.js 18** - UI framework
- **Material-UI** - Design system
- **WebRTC** - Camera access
- **Recharts** - Data visualization
- **Socket.IO Client** - Real-time updates

## 📋 Requirements

### System Requirements
- Python 3.8 or higher
- Node.js 16 or higher
- Webcam or CCTV camera
- Minimum 4GB RAM
- CPU with SSE4.2 support (for TensorFlow)

### Performance Specifications
- **FPS**: 10-15 on CPU for up to 4 faces
- **Latency**: <100ms processing time per frame
- **Memory**: ~500MB RAM usage
- **CPU**: Optimized for Intel/AMD processors

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/CCTV-based-Age-and-Gender-Detection.git
cd CCTV-based-Age-and-Gender-Detection
```

### 2. Backend Setup
```bash
# Install Python dependencies
pip install -r requirements.txt

# Start the Flask backend
cd backend
python app.py
```

The backend will start on `http://localhost:5000`

### 3. Frontend Setup
```bash
# Install Node.js dependencies
cd frontend
npm install

# Start the React development server
npm start
```

The frontend will start on `http://localhost:3000`

### 4. Access the Application
Open your browser and navigate to `http://localhost:3000`

## 📖 Usage Guide

### Starting Detection
1. **Allow camera access** when prompted by your browser
2. **Click "Start Stream"** to begin real-time detection
3. **View live results** with bounding boxes and demographic labels
4. **Monitor statistics** in the analytics dashboard

### Dashboard Features
- **Live video feed** with face detection overlays
- **Real-time statistics** (total faces, current faces, detection rate)
- **Age distribution chart** showing demographic breakdown
- **Gender distribution pie chart** with percentages
- **System status indicators** for connection and processing state

### API Endpoints
- `GET /api/stats` - Get current detection statistics
- `POST /api/reset-stats` - Reset all statistics
- `WebSocket /` - Real-time video frame processing

## 🔧 Configuration

### Model Configuration
Edit `backend/model_handler.py` to customize:
- Model input size (default: 64x64)
- Age groups classification
- Confidence thresholds
- Detection parameters

### Video Configuration
Modify `frontend/src/components/VideoStream.js`:
- Frame rate settings
- Video resolution
- Capture intervals
- Processing frequency

### Performance Tuning
For better performance:
- Reduce video resolution
- Lower frame capture rate
- Adjust MediaPipe confidence threshold
- Use smaller model input sizes

## 🏗️ Architecture

```
┌─────────────────┐    WebSocket     ┌─────────────────┐
│   React Frontend│◄─────────────────►│  Flask Backend  │
│                 │                   │                 │
│ • Video Stream  │                   │ • MediaPipe     │
│ • Statistics    │                   │ • TensorFlow    │
│ • Dashboard     │                   │ • OpenCV        │
└─────────────────┘                   └─────────────────┘
         │                                      │
         ▼                                      ▼
   ┌──────────┐                         ┌──────────────┐
   │ WebRTC   │                         │ AI Models    │
   │ Camera   │                         │ • Age Model  │
   └──────────┘                         │ • Gender     │
                                        └──────────────┘
```

## 📊 Model Performance

| Metric | Value |
|--------|--------|
| Face Detection Accuracy | >95% |
| Age Estimation MAE | ~5-8 years |
| Gender Classification | >90% accuracy |
| Processing Speed | 10-15 FPS (CPU) |
| Model Size | <50MB total |
| Memory Usage | ~500MB |

## 🔒 Security & Privacy

- **Local processing** - No data sent to external servers
- **Browser-based** - Camera access controlled by user
- **No data storage** - Real-time processing only
- **Privacy-first** - Demographic analysis without identity

## 🚀 Production Deployment

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up --build
```

### Environment Variables
```bash
export FLASK_ENV=production
export FLASK_DEBUG=False
export PORT=5000
```

### HTTPS Configuration
For production deployment, configure SSL/TLS:
- Use nginx as reverse proxy
- Obtain SSL certificates
- Configure secure WebSocket connections

## 🧪 Testing

### Backend Tests
```bash
cd backend
python -m pytest tests/
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **MediaPipe** by Google for face detection
- **TensorFlow** team for machine learning framework
- **React** community for frontend framework
- **Material-UI** for design components

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review existing solutions

## 🚧 Roadmap

- [ ] Multi-camera support
- [ ] Enhanced model accuracy
- [ ] Mobile app development
- [ ] Cloud deployment options
- [ ] Advanced analytics features
- [ ] Real-time alerts system

---

**Built with ❤️ for intelligent surveillance and demographic analysis**