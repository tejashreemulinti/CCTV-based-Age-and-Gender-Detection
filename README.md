# 🎯 CCTV Age and Gender Detection System

A **real-time, lightweight AI system** for detecting faces and estimating age/gender from webcam feeds. Built for **Windows environments** with **VS Code integration** and browser-based interface, optimized for modest hardware (CPU-only, laptops).

## 🚀 Quick Start (Clone & Run)

### Prerequisites
1. **Python 3.8+** - [Download here](https://www.python.org/downloads/)
2. **Node.js 16+** - [Download here](https://nodejs.org/)
3. **VS Code** (recommended) - [Download here](https://code.visualstudio.com/)

### Clone & Setup
```bash
# Clone repository
git clone <your-repository-url>
cd cctv-detection-system

# Open in VS Code
code .

# Run automated setup
setup.bat

# Start the system
run_system.bat
```

**Access at: http://localhost:3000** 🎉

## ✨ Features

- 🎥 **Real-time Face Detection** (up to 4 faces simultaneously)
- 👥 **Age & Gender Estimation** with confidence scores
- 📊 **Live Analytics Dashboard** with interactive charts
- 🌐 **Modern Web Interface** (React + Material-UI)
- ⚡ **High Performance** (10-15 FPS on CPU)
- 🖥️ **Windows Optimized** with VS Code integration
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

**Development:**
- VS Code with integrated debugging
- Python virtual environment
- Automated Windows batch scripts
- Git integration ready

## 📁 Repository Structure

```
cctv-detection-system/
├── .vscode/                    # VS Code configuration
│   ├── settings.json          # Workspace settings
│   ├── tasks.json             # Build tasks
│   ├── launch.json            # Debug configuration
│   └── extensions.json        # Recommended extensions
├── backend/                    # Python Flask backend
│   ├── app.py                 # Main Flask application
│   ├── simple_detection.py    # Face detection system
│   ├── model_handler.py       # Model management
│   └── enhanced_models.py     # Advanced model support
├── frontend/                   # React frontend
│   ├── public/                # Static files
│   ├── src/                   # React source code
│   │   ├── App.js             # Main React application
│   │   ├── index.js           # React entry point
│   │   └── components/        # React components
│   └── package.json           # Node.js dependencies
├── setup.bat                   # Windows setup script
├── run_backend.bat            # Start backend server
├── run_frontend.bat           # Start frontend server
├── run_system.bat             # Start both servers
├── requirements.txt           # Python dependencies
├── .gitignore                 # Git ignore rules
├── VS_CODE_SETUP.md           # Detailed VS Code guide
└── README.md                  # This file
```

## 🎮 Usage

1. **Clone repository** and open in VS Code
2. **Run setup.bat** for automated installation
3. **Start system** with run_system.bat or VS Code tasks
4. **Open browser** to `http://localhost:3000`
5. **Allow camera permissions** when prompted
6. **Click "Start Detection"** to begin real-time analysis

## 🔧 VS Code Integration

### Quick Commands
- **Ctrl+Shift+P** → "Tasks: Run Task":
  - **Setup Project** - Complete installation
  - **Start Full System** - Launch both servers
  - **Start Backend** - Python Flask server only
  - **Start Frontend** - React development server only

### Debugging
- **F5** - Start Flask backend with debugger
- Set breakpoints in Python code
- Integrated terminal for both Python and Node.js

### Extensions (Auto-installed)
- Python support with debugging
- Prettier code formatting
- ESLint JavaScript linting
- Auto-rename HTML/JSX tags

## 📊 Performance Specifications

| Feature | Windows Performance |
|---------|-------------------|
| **Face Detection** | 10-15 FPS on CPU |
| **Max Faces** | 4 simultaneous |
| **Processing Latency** | <100ms per frame |
| **Memory Usage** | ~500MB total |
| **Browser Support** | Chrome, Firefox, Edge |
| **Camera Resolution** | 640x480 default |

## 📊 API Endpoints

**WebSocket Events:**
- `video_frame` - Send camera frames for processing
- `detection_result` - Receive face detection results
- `stats_update` - Receive updated statistics

**REST API:**
- `GET /api/stats` - Get current detection statistics
- `GET /api/health` - Check system health
- `POST /api/reset-stats` - Reset detection counters

## 🔧 Configuration

### Camera Settings
Edit `frontend/src/components/VideoStream.js`:
```javascript
const videoConstraints = {
  width: 640,      // Adjust resolution
  height: 480,     // Adjust resolution
  facingMode: "user"
};
```

### Performance Settings
Edit `backend/simple_detection.py`:
```python
faces = self.face_cascade.detectMultiScale(
    gray,
    scaleFactor=1.1,      # Lower for more accuracy (slower)
    minNeighbors=5,       # Higher for fewer false positives
    minSize=(30, 30),     # Minimum face size
)
```

## 🛡️ Security & Privacy

- ✅ **100% Local Processing** - No external API calls
- ✅ **No Data Storage** - Real-time analysis only
- ✅ **Browser-Controlled Camera** - User permission required
- ✅ **Localhost Only** - No network exposure by default
- ✅ **Windows Firewall Compatible** - Standard ports

## 🐛 Troubleshooting

### Common Issues

**"Python is not recognized":**
- Reinstall Python with "Add to PATH" checked
- Or use: Ctrl+Shift+P → "Python: Select Interpreter"

**Camera not working:**
- Check Windows Privacy Settings > Camera
- Try Chrome browser (best compatibility)
- Close other apps using camera

**VS Code Issues:**
- Reload window: Ctrl+Shift+P → "Developer: Reload Window"
- Install recommended extensions when prompted

**Port conflicts:**
- Backend: Change port in `backend/app.py`
- Frontend: Run `npm start -- --port 3001`

## 🔮 Future Enhancements

- [ ] **TensorFlow Lite Integration** - Production-ready models
- [ ] **GPU Acceleration** - CUDA support for NVIDIA GPUs
- [ ] **Multi-camera Support** - Multiple webcam inputs
- [ ] **Data Export** - CSV/JSON export of statistics
- [ ] **Real-time Alerts** - Email/SMS notifications
- [ ] **Database Storage** - SQLite for historical data

## 🤝 Use Cases

- **Retail Analytics** - Customer demographic insights
- **Security Systems** - Enhanced surveillance with demographics
- **Event Management** - Crowd analysis and monitoring
- **Research Projects** - Computer vision and ML studies
- **Smart Buildings** - Occupancy and demographic tracking

## 📝 Documentation

- **[VS_CODE_SETUP.md](VS_CODE_SETUP.md)** - Detailed VS Code development guide
- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Comprehensive deployment instructions
- **[WINDOWS_QUICK_START.md](WINDOWS_QUICK_START.md)** - 8-minute setup guide

## 📞 Support

For technical support:
1. Check [VS_CODE_SETUP.md](VS_CODE_SETUP.md) for development issues
2. Review [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for setup problems
3. Ensure all prerequisites are properly installed
4. Test with Chrome browser for best compatibility

---

**Ready to analyze demographics in real-time with VS Code! 🚀📊**

**Built with ❤️ for Windows development environments**