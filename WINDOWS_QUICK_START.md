# 🖥️ Windows Quick Start Guide

## Step 1: Install Prerequisites (5 minutes)

1. **Download and install Python 3.8+**
   - Go to [python.org](https://www.python.org/downloads/)
   - Download latest Python 3.11 or 3.12 (recommended)
   - ⚠️ **Important**: Check "Add Python to PATH" during installation

2. **Download and install Node.js 16+**
   - Go to [nodejs.org](https://nodejs.org/)
   - Download LTS version (recommended)
   - Install with default settings

## Step 2: Setup System (2 minutes)

1. **Extract/Download** this project to a folder like `C:\cctv-detection`

2. **Open Command Prompt as Administrator**
   - Press `Win + R`, type `cmd`, press `Ctrl + Shift + Enter`

3. **Navigate to project folder**:
   ```cmd
   cd C:\cctv-detection
   ```

4. **Run automated setup**:
   ```cmd
   setup.bat
   ```

## Step 3: Start System (1 minute)

1. **Start both servers**:
   ```cmd
   run_system.bat
   ```

2. **Open your browser** and go to:
   ```
   http://localhost:3000
   ```

3. **Allow camera access** when prompted

4. **Click "Start Detection"** to begin!

## 🎯 What You'll See

- Real-time video with face detection boxes
- Age and gender predictions for each face
- Live statistics dashboard with charts
- Performance metrics (FPS, detection count)

## 🛠️ Manual Control

If you prefer to start services separately:

**Backend** (keep this running):
```cmd
run_backend.bat
```

**Frontend** (in new Command Prompt):
```cmd
run_frontend.bat
```

## ❓ Common Issues

**"Python is not recognized"**
- Reinstall Python with "Add to PATH" checked

**"node is not recognized"** 
- Restart Command Prompt after Node.js installation

**Camera not working**
- Check Windows Privacy Settings > Camera
- Try Chrome browser (best compatibility)
- Close other apps using camera

**Port already in use**
- Close any running instances
- Restart Command Prompt

## 🔧 Performance Tips

- Close unnecessary applications for better performance
- Use Chrome browser for best WebRTC support
- Ensure good lighting for better face detection

---

**Ready to analyze demographics in real-time! 🚀**