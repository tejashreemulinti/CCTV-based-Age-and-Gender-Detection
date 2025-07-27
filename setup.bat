@echo off
echo ===============================================
echo  CCTV Age and Gender Detection - Windows Setup
echo ===============================================

:: Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://python.org
    pause
    exit /b 1
)

:: Check Python version
for /f "tokens=2" %%i in ('python --version') do set PYTHON_VERSION=%%i
echo Found Python %PYTHON_VERSION%

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

:: Check Node.js version
for /f "tokens=1" %%i in ('node --version') do set NODE_VERSION=%%i
echo Found Node.js %NODE_VERSION%

echo.
echo Setting up Python backend...
echo ============================

:: Create backend directory if it doesn't exist
if not exist backend mkdir backend

:: Create virtual environment
echo Creating Python virtual environment...
python -m venv venv
if %errorlevel% neq 0 (
    echo ERROR: Failed to create virtual environment
    pause
    exit /b 1
)

:: Activate virtual environment and install dependencies
echo Activating virtual environment and installing dependencies...
call venv\Scripts\activate.bat
pip install --upgrade pip
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ERROR: Failed to install Python dependencies
    pause
    exit /b 1
)

echo.
echo Setting up React frontend...
echo ===========================

:: Install frontend dependencies
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install Node.js dependencies
    cd ..
    pause
    exit /b 1
)
cd ..

:: Create run scripts
echo.
echo Creating Windows run scripts...
echo ===============================

:: Create backend run script
echo @echo off > run_backend.bat
echo echo Starting CCTV Age and Gender Detection Backend... >> run_backend.bat
echo call venv\Scripts\activate.bat >> run_backend.bat
echo cd backend >> run_backend.bat
echo python app.py >> run_backend.bat
echo pause >> run_backend.bat

:: Create frontend run script
echo @echo off > run_frontend.bat
echo echo Starting React Frontend... >> run_frontend.bat
echo cd frontend >> run_frontend.bat
echo npm start >> run_frontend.bat
echo pause >> run_frontend.bat

:: Create combined run script
echo @echo off > run_system.bat
echo echo Starting CCTV Age and Gender Detection System... >> run_system.bat
echo echo. >> run_system.bat
echo echo Starting Backend Server... >> run_system.bat
echo start "Backend Server" run_backend.bat >> run_system.bat
echo timeout /t 3 /nobreak ^>nul >> run_system.bat
echo echo Starting Frontend Server... >> run_system.bat
echo start "Frontend Server" run_frontend.bat >> run_system.bat
echo echo. >> run_system.bat
echo echo System is starting... >> run_system.bat
echo echo Backend: http://localhost:5000 >> run_system.bat
echo echo Frontend: http://localhost:3000 >> run_system.bat
echo echo. >> run_system.bat
echo echo Press any key to exit... >> run_system.bat
echo pause ^>nul >> run_system.bat

echo.
echo ===============================================
echo  Setup Complete!
echo ===============================================
echo.
echo To start the system:
echo 1. Run: run_system.bat  (starts both servers)
echo    OR
echo 2. Run separately:
echo    - Backend: run_backend.bat
echo    - Frontend: run_frontend.bat
echo.
echo The system will be available at:
echo - Frontend: http://localhost:3000
echo - Backend API: http://localhost:5000
echo.
echo Make sure to allow camera permissions in your browser!
echo.
pause