# 🎯 CCTV Age and Gender Detection System

A **real-time, lightweight AI system** for detecting faces and estimating age/gender from webcam feeds. Built for **Windows environments** with browser-based interface, optimized for modest hardware (CPU-only, laptops).

## ✨ Features

- 🎥 **Real-time Face Detection** (up to 4 faces simultaneously)
- 👥 **Age & Gender Estimation** with confidence scores
- 📊 **Live Analytics Dashboard** with interactive charts
- 🌐 **Modern Web Interface** (React + Material-UI)
- ⚡ **High Performance** (10-15 FPS on CPU)
- 🖥️ **Windows Compatible** with easy setup
- 📱 **Browser-based** - no additional software needed
- 🔒 **Privacy-first** - all processing done locally

## 🛠️ Tech Stack

**Backend:**
- Python 3.8+ with Flask
- OpenCV for face detection
- Socket.IO for real-time communication
- NumPy for data processing

**Frontend:**
- React.js 18 with Material-UI
- WebRTC for camera access
- Recharts for data visualization
- Socket.IO client for real-time updates

## 🚀 Quick Start (Windows)

### Prerequisites

1. **Python 3.8+** - Download from [python.org](https://www.python.org/downloads/)
2. **Node.js 16+** - Download from [nodejs.org](https://nodejs.org/)
3. **Web Browser** - Chrome, Firefox, or Edge with camera permissions

### Automated Setup

1. **Clone or download** this project to your Windows machine
2. **Open Command Prompt** as Administrator (recommended)
3. **Navigate** to the project directory:
   ```cmd
   cd path\to\cctv-detection-system
   ```
4. **Run the setup script**:
   ```cmd
   setup.bat
   ```
5. **Start the system**:
   ```cmd
   run_system.bat
   ```

That's it! The system will automatically:
- Create Python virtual environment
- Install all dependencies
- Start both backend and frontend servers
- Open your browser to the application

### Manual Setup (if needed)

If the automated setup doesn't work, follow these steps:

#### Backend Setup
```cmd
# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate.bat

# Install dependencies
pip install -r requirements.txt

# Start backend server
cd backend
python app.py
```

#### Frontend Setup (new Command Prompt window)
```cmd
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

## 🎮 Usage

1. **Open your browser** to `http://localhost:3000`
2. **Allow camera permissions** when prompted
3. **Click "Start Detection"** to begin real-time analysis
4. **View live results**:
   - Face detection with bounding boxes
   - Age and gender predictions
   - Real-time statistics and charts
   - System performance metrics

## 📊 API Endpoints

**WebSocket Events:**
- `video_frame` - Send camera frames for processing
- `detection_result` - Receive face detection results
- `stats_update` - Receive updated statistics

**REST API:**
- `GET /api/stats` - Get current detection statistics
- `GET /api/health` - Check system health
- `POST /api/reset-stats` - Reset detection counters

## 📁 Project Structure

```
cctv-detection-system/
├── backend/
│   ├── app.py                 # Main Flask application
│   ├── simple_detection.py    # Face detection system
│   └── model_handler.py       # Model management
├── frontend/
│   ├── src/
│   │   ├── App.js             # Main React application
│   │   └── components/        # React components
│   ├── public/
│   └── package.json
├── requirements.txt           # Python dependencies
├── setup.bat                  # Windows setup script
├── run_system.bat            # Start both servers
├── run_backend.bat           # Start backend only
├── run_frontend.bat          # Start frontend only
└── README.md                 # This file
```

## 🔧 Configuration

### Camera Settings
- **Resolution**: 640x480 (default) - adjustable in VideoStream.js
- **Frame Rate**: 10-15 FPS - automatically optimized
- **Detection Threshold**: 0.3 confidence minimum

### Performance Tuning
- **Face Detection**: Haar Cascade scaleFactor = 1.1
- **Min Face Size**: 30x30 pixels
- **Max Faces**: 4 simultaneous detections
- **Processing**: CPU-optimized for Windows

### Browser Compatibility
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Edge 80+
- ✅ Safari 13+ (macOS)

## 🛡️ Security & Privacy

- **Local Processing**: No data sent to external servers
- **Camera Access**: WebRTC with user permission only
- **No Storage**: Video frames processed in memory only
- **CORS Protection**: Backend configured for localhost only

## ⚡ Performance Optimization

**For better performance:**

1. **Close unnecessary applications** while running
2. **Use dedicated GPU** (if available) by modifying OpenCV settings
3. **Adjust camera resolution** in `frontend/src/components/VideoStream.js`
4. **Reduce max faces** in `backend/simple_detection.py`

## 🐛 Troubleshooting

### Common Issues

**Camera not working:**
- Ensure browser has camera permissions
- Close other applications using the camera
- Try refreshing the page

**Backend connection error:**
- Check if Python virtual environment is activated
- Verify backend is running on port 5000
- Check Windows Firewall settings

**Frontend not loading:**
- Ensure Node.js is properly installed
- Check if port 3000 is available
- Clear browser cache and try again

**Poor performance:**
- Close resource-intensive applications
- Lower camera resolution in settings
- Reduce detection frequency

### Windows-Specific Issues

**Python not found:**
```cmd
# Add Python to PATH or use full path
C:\Users\YourName\AppData\Local\Programs\Python\Python39\python.exe -m venv venv
```

**Permission denied:**
- Run Command Prompt as Administrator
- Check antivirus software isn't blocking execution

**Port conflicts:**
- Backend: Change port in `backend/app.py` (line: `socketio.run(app, port=5000)`)
- Frontend: Change port with `npm start -- --port 3001`

## 🔮 Future Enhancements

- [ ] **GPU Acceleration** - CUDA support for NVIDIA GPUs
- [ ] **Advanced Models** - TensorFlow Lite integration
- [ ] **Multi-camera Support** - Multiple webcam inputs
- [ ] **Data Export** - CSV/JSON export of statistics
- [ ] **Real-time Alerts** - Email/SMS notifications
- [ ] **Database Storage** - SQLite for historical data
- [ ] **Mobile App** - React Native companion app

## 🤝 Use Cases

- **Retail Analytics** - Customer demographic insights
- **Security Systems** - Enhanced surveillance with demographics
- **Event Management** - Crowd analysis and monitoring
- **Research Projects** - Computer vision and ML studies
- **Smart Buildings** - Occupancy and demographic tracking

## 📝 License

This project is for educational and commercial use. Please ensure compliance with local privacy laws when deploying in production environments.

## 🆘 Support

For technical support or questions:
1. Check the troubleshooting section above
2. Review the configuration options
3. Ensure all prerequisites are properly installed
4. Test with different browsers if issues persist

---

**Made for Windows environments with ❤️ for real-time computer vision applications**