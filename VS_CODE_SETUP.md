# 🚀 VS Code Setup Guide

## Quick Clone & Run Instructions

### Step 1: Clone Repository
```bash
git clone <your-repository-url>
cd cctv-detection-system
```

### Step 2: Open in VS Code
```bash
code .
```

### Step 3: Install Prerequisites
1. **Python 3.8+**: Download from [python.org](https://www.python.org/downloads/)
2. **Node.js 16+**: Download from [nodejs.org](https://nodejs.org/)

### Step 4: Run Setup (Choose One)

#### Option A: Automated Setup
- Press `Ctrl+Shift+P` → Type "Tasks: Run Task" → Select "Setup Project"
- OR run in terminal: `setup.bat`

#### Option B: Manual Setup
1. **Python Setup**:
   ```cmd
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. **Frontend Setup**:
   ```cmd
   cd frontend
   npm install
   cd ..
   ```

### Step 5: Start Development

#### Method 1: VS Code Tasks
- Press `Ctrl+Shift+P` → "Tasks: Run Task" → "Start Full System"

#### Method 2: Manual Commands
```cmd
# Terminal 1 - Backend
run_backend.bat

# Terminal 2 - Frontend  
run_frontend.bat
```

#### Method 3: VS Code Debug
- Press `F5` to start Python debugger for backend
- Or use Debug Panel → "Python: Flask Backend"

### Step 6: Access Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 🛠️ VS Code Features Configured

### Extensions (Auto-recommended)
- Python support with debugging
- Prettier for code formatting
- ESLint for JavaScript linting
- Auto-rename tags for HTML/JSX
- Path intellisense

### Integrated Tasks
- `Ctrl+Shift+P` → "Tasks: Run Task":
  - **Setup Project** - Complete setup
  - **Start Backend** - Python Flask server
  - **Start Frontend** - React development server
  - **Start Full System** - Both servers
  - **Install Python Dependencies**
  - **Install Frontend Dependencies**

### Debug Configuration
- **F5** - Start Flask backend with debugger
- Breakpoints supported in Python code
- Integrated terminal for both Python and Node.js

### Workspace Settings
- Python virtual environment auto-detection
- Auto-formatting on save
- Optimized file search (excludes node_modules, venv)
- Windows terminal integration

## 📁 Project Structure

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
│   │   ├── index.html         # Main HTML template
│   │   └── manifest.json      # Web app manifest
│   ├── src/                   # React source code
│   │   ├── App.js             # Main React application
│   │   ├── index.js           # React entry point
│   │   └── components/        # React components
│   │       ├── VideoStream.js     # Camera handling
│   │       ├── StatsDashboard.js  # Analytics dashboard
│   │       ├── DetectionOverlay.js # Face overlays
│   │       └── ConnectionStatus.js # Connection status
│   └── package.json           # Node.js dependencies
├── setup.bat                   # Windows setup script
├── run_backend.bat            # Start backend server
├── run_frontend.bat           # Start frontend server
├── run_system.bat             # Start both servers
├── requirements.txt           # Python dependencies
├── .gitignore                 # Git ignore rules
└── README.md                  # Project documentation
```

## 🎯 Development Workflow

### 1. Making Changes
- **Backend**: Edit files in `backend/` directory
- **Frontend**: Edit files in `frontend/src/` directory
- VS Code will auto-reload on file changes

### 2. Debugging
- **Python**: Set breakpoints and press F5
- **JavaScript**: Use browser developer tools
- **Network**: Monitor WebSocket connections in browser

### 3. Testing
- **Backend**: Test API endpoints at http://localhost:5000
- **Frontend**: Test UI at http://localhost:3000
- **Integration**: Test camera functionality with both running

### 4. Adding Features
- **New Python modules**: Add to `backend/` and update imports
- **New React components**: Add to `frontend/src/components/`
- **Dependencies**: Update `requirements.txt` or `package.json`

## 🔧 Common VS Code Operations

### Terminal Operations
- **Ctrl+`** - Open integrated terminal
- **Ctrl+Shift+`** - New terminal
- Multiple terminals for backend/frontend

### File Operations
- **Ctrl+P** - Quick file search
- **Ctrl+Shift+E** - Explorer panel
- **Ctrl+Shift+F** - Global search

### Python Development
- **F5** - Start debugging
- **Ctrl+F5** - Run without debugging
- **Shift+F5** - Stop debugging

### Git Integration
- **Ctrl+Shift+G** - Source control panel
- Built-in Git support for commits, pushes

## 🐛 Troubleshooting

### Python Issues
- Ensure virtual environment is activated: `venv\Scripts\activate`
- Check Python interpreter: Ctrl+Shift+P → "Python: Select Interpreter"

### Node.js Issues
- Clear cache: `npm cache clean --force`
- Delete node_modules: `rm -rf frontend/node_modules && npm install`

### VS Code Issues
- Reload window: Ctrl+Shift+P → "Developer: Reload Window"
- Reset settings: Delete .vscode/settings.json (will regenerate)

### Port Conflicts
- Backend (5000): Change in `backend/app.py`
- Frontend (3000): Change with `npm start -- --port 3001`

## 📚 Additional Resources

- **React DevTools**: Browser extension for React debugging
- **Python Extension**: Rich Python development support
- **Live Server**: For serving static files during development
- **GitLens**: Enhanced Git capabilities in VS Code

---

**Happy coding! 🚀** Your CCTV detection system is ready for development in VS Code!