# 🚀 Windows Deployment Guide

Complete step-by-step guide for deploying the CCTV Age and Gender Detection System on Windows environments.

## ⚡ Quick Start (5 Minutes)

**For immediate setup on Windows:**

1. **Download** Python 3.8+ and Node.js 16+ from their official websites
2. **Extract** this project to a folder (e.g., `C:\cctv-detection`)
3. **Open Command Prompt** as Administrator
4. **Navigate** to project folder: `cd C:\cctv-detection`
5. **Run**: `setup.bat`
6. **Start system**: `run_system.bat`
7. **Open browser**: `http://localhost:3000`

**That's it! 🎉 The system should now be running.**

---

## 📋 System Requirements

### Minimum Requirements
- **OS**: Windows 10 or Windows 11
- **RAM**: 4GB minimum, 8GB recommended
- **CPU**: Intel Core i3 or AMD equivalent (with SSE4.2 support)
- **Storage**: 2GB free space
- **Camera**: Built-in webcam or USB camera
- **Internet**: For initial dependency downloads

### Software Prerequisites
- **Python 3.8-3.12** (3.13 may have compatibility issues)
- **Node.js 16+** (LTS version recommended)
- **Git** (optional, for cloning repository)
- **Modern Web Browser** (Chrome 80+, Firefox 75+, Edge 80+)

## 🛠️ Installation Methods

### Method 1: Automated Setup (Recommended)

1. **Download/Clone the Project**
   ```cmd
   # If you have Git installed
   git clone <repository-url>
   cd cctv-detection-system
   
   # Or download and extract the ZIP file
   ```

2. **Run Automated Setup**
   ```cmd
   # Right-click on setup.bat and "Run as Administrator"
   # OR in Command Prompt:
   setup.bat
   ```

3. **Start the System**
   ```cmd
   run_system.bat
   ```

### Method 2: Manual Installation

#### Step 1: Install Python Dependencies

1. **Open Command Prompt** (preferably as Administrator)
2. **Navigate to project directory**:
   ```cmd
   cd C:\path\to\cctv-detection-system
   ```

3. **Create Virtual Environment**:
   ```cmd
   python -m venv venv
   ```

4. **Activate Virtual Environment**:
   ```cmd
   venv\Scripts\activate.bat
   ```

5. **Upgrade pip and install dependencies**:
   ```cmd
   python -m pip install --upgrade pip
   pip install -r requirements.txt
   ```

#### Step 2: Install Node.js Dependencies

1. **Open new Command Prompt window**
2. **Navigate to frontend directory**:
   ```cmd
   cd C:\path\to\cctv-detection-system\frontend
   ```

3. **Install dependencies**:
   ```cmd
   npm install
   ```

#### Step 3: Start Services

**Backend Server** (first Command Prompt):
```cmd
# Ensure virtual environment is activated
venv\Scripts\activate.bat
cd backend
python app.py
```

**Frontend Server** (second Command Prompt):
```cmd
cd frontend
npm start
```

## 🌐 Access & Usage

1. **Backend API**: `http://localhost:5000`
2. **Frontend Web App**: `http://localhost:3000`
3. **Allow camera permissions** when prompted by browser
4. **Click "Start Detection"** to begin real-time analysis

## ⚙️ Configuration

### Camera Settings

Edit `frontend\src\components\VideoStream.js`:
```javascript
const videoConstraints = {
  width: 640,      // Adjust resolution
  height: 480,     // Adjust resolution
  facingMode: "user"
};
```

### Performance Settings

Edit `backend\simple_detection.py`:
```python
# Adjust face detection parameters
faces = self.face_cascade.detectMultiScale(
    gray,
    scaleFactor=1.1,      # Lower for more accuracy (slower)
    minNeighbors=5,       # Higher for fewer false positives
    minSize=(30, 30),     # Minimum face size
    flags=cv2.CASCADE_SCALE_IMAGE
)
```

### Port Configuration

**Backend Port** (`backend\app.py`):
```python
if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)  # Change port here
```

**Frontend Proxy** (`frontend\package.json`):
```json
{
  "proxy": "http://localhost:5000"  // Must match backend port
}
```

## 🔧 Troubleshooting

### Common Installation Issues

#### Python Issues

**"Python is not recognized":**
```cmd
# Add Python to PATH or use full path:
C:\Users\%USERNAME%\AppData\Local\Programs\Python\Python39\python.exe -m venv venv
```

**"ensurepip is not available":**
```cmd
# Download and install Python from python.org with "Add to PATH" checked
# Ensure pip is included in installation
```

**Virtual environment activation fails:**
```cmd
# Try different activation method:
venv\Scripts\activate
# OR
call venv\Scripts\activate.bat
```

#### Node.js Issues

**"node is not recognized":**
- Restart Command Prompt after Node.js installation
- Add Node.js to PATH manually: `C:\Program Files\nodejs`

**npm install fails with permission errors:**
```cmd
# Run Command Prompt as Administrator
# OR configure npm for non-admin use:
npm config set prefix "%APPDATA%\npm"
```

#### Camera Issues

**Camera not detected:**
- Check Windows Privacy Settings > Camera
- Ensure camera isn't used by another application
- Try different browsers (Chrome recommended)

**Permission denied:**
- Allow camera access in browser settings
- Check Windows Camera app works first

#### Network Issues

**Port conflicts:**
```cmd
# Check what's using port 5000:
netstat -ano | findstr :5000

# Kill process if needed:
taskkill /PID <process_id> /F
```

**Firewall blocking:**
- Add Python and Node.js to Windows Firewall exceptions
- Temporarily disable antivirus for testing

### Performance Issues

**Low FPS or high CPU usage:**

1. **Close unnecessary applications**
2. **Lower camera resolution**:
   ```javascript
   // In VideoStream.js
   const videoConstraints = {
     width: 320,    // Reduced from 640
     height: 240    // Reduced from 480
   };
   ```

3. **Reduce detection frequency**:
   ```javascript
   // In VideoStream.js
   const captureFrame = useCallback(() => {
     // ... existing code ...
   }, [socket, isStreaming]);
   
   // Change interval from 100ms to 200ms
   useEffect(() => {
     if (isStreaming && socket?.connected) {
       const interval = setInterval(captureFrame, 200); // Increased interval
       return () => clearInterval(interval);
     }
   }, [isStreaming, socket?.connected, captureFrame]);
   ```

## 🔒 Security Considerations

### Local Development
- System runs only on localhost by default
- No external network access required after setup
- Camera data processed locally only

### Firewall Configuration
```cmd
# Allow Python through Windows Firewall
netsh advfirewall firewall add rule name="Python Flask" dir=in action=allow program="C:\path\to\python.exe"

# Allow Node.js through Windows Firewall  
netsh advfirewall firewall add rule name="Node.js" dir=in action=allow program="C:\Program Files\nodejs\node.exe"
```

### Browser Security
- Only grant camera permissions to localhost
- Use HTTPS in production (not covered in this guide)
- Regularly update browser for security patches

## 📊 Monitoring & Logs

### Backend Logs
- Console output shows detection statistics
- Error messages displayed in Command Prompt
- Add logging to file if needed:

```python
# In backend/app.py
import logging
logging.basicConfig(filename='app.log', level=logging.INFO)
```

### Frontend Logs
- Browser Developer Tools > Console
- Network tab for WebSocket connections
- React DevTools for component debugging

### System Monitoring
```cmd
# Monitor CPU usage
wmic cpu get loadpercentage /value

# Monitor memory usage
wmic OS get TotalVisibleMemorySize,FreePhysicalMemory /value

# Monitor network connections
netstat -an | findstr :5000
netstat -an | findstr :3000
```

## 🚀 Production Deployment

### For Local Network Access

1. **Change backend host**:
   ```python
   # In backend/app.py
   socketio.run(app, host='0.0.0.0', port=5000)
   ```

2. **Update frontend proxy**:
   ```json
   // In package.json
   "proxy": "http://YOUR_IP_ADDRESS:5000"
   ```

3. **Configure Windows Firewall**:
   ```cmd
   netsh advfirewall firewall add rule name="Flask Backend" dir=in action=allow protocol=TCP localport=5000
   netsh advfirewall firewall add rule name="React Frontend" dir=in action=allow protocol=TCP localport=3000
   ```

### Service Installation (Advanced)

To run as Windows service, consider using:
- **NSSM** (Non-Sucking Service Manager)
- **Python windows-service wrapper**
- **Task Scheduler** for automatic startup

## 📝 Backup & Recovery

### Backup Important Files
```cmd
# Create backup directory
mkdir backup_%date:~-4,4%%date:~-10,2%%date:~-7,2%

# Copy configuration files
copy backend\app.py backup_%date:~-4,4%%date:~-10,2%%date:~-7,2%\
copy frontend\src\components\*.js backup_%date:~-4,4%%date:~-10,2%%date:~-7,2%\
copy requirements.txt backup_%date:~-4,4%%date:~-10,2%%date:~-7,2%\
```

### Environment Recreation
```cmd
# Export current environment
pip freeze > requirements_current.txt

# Recreate environment
python -m venv venv_new
venv_new\Scripts\activate.bat
pip install -r requirements_current.txt
```

## 📞 Support & Maintenance

### Regular Maintenance
- **Update dependencies monthly**:
  ```cmd
  pip install --upgrade -r requirements.txt
  npm update
  ```

- **Clear browser cache** if experiencing issues
- **Restart services** daily for optimal performance
- **Monitor disk space** for log files

### Getting Help
1. Check error messages in Command Prompt
2. Review browser Developer Tools console
3. Verify all prerequisites are correctly installed
4. Test with minimal configuration first

---

**Ready to deploy? Start with Method 1 (Automated Setup) for the smoothest experience! 🎯**