#!/bin/bash

# CCTV Age and Gender Detection Setup Script
echo "🚀 Setting up CCTV Age and Gender Detection System..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

# Check Python version
python_version=$(python3 -c 'import sys; print(".".join(map(str, sys.version_info[:2])))')
required_version="3.8"

if [ "$(printf '%s\n' "$required_version" "$python_version" | sort -V | head -n1)" != "$required_version" ]; then
    echo "❌ Python version $python_version is not supported. Please install Python 3.8 or higher."
    exit 1
fi

echo "✅ Python $python_version detected"

# Check Node.js version
node_version=$(node -v | sed 's/v//')
required_node="16.0.0"

if [ "$(printf '%s\n' "$required_node" "$node_version" | sort -V | head -n1)" != "$required_node" ]; then
    echo "❌ Node.js version $node_version is not supported. Please install Node.js 16+ or higher."
    exit 1
fi

echo "✅ Node.js $node_version detected"

# Install Python dependencies
echo "📦 Installing Python dependencies..."
pip3 install -r requirements.txt

if [ $? -ne 0 ]; then
    echo "❌ Failed to install Python dependencies"
    exit 1
fi

echo "✅ Python dependencies installed"

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
cd frontend
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install Node.js dependencies"
    exit 1
fi

cd ..
echo "✅ Node.js dependencies installed"

# Create models directory
echo "📁 Creating models directory..."
mkdir -p backend/models

# Set up environment
echo "🔧 Setting up environment..."
cat > .env << EOL
# Backend Configuration
FLASK_ENV=development
FLASK_DEBUG=True
FLASK_PORT=5000

# Frontend Configuration
REACT_APP_BACKEND_URL=http://localhost:5000
EOL

echo "✅ Environment configured"

# Create run scripts
echo "📝 Creating run scripts..."

# Backend run script
cat > run_backend.sh << EOL
#!/bin/bash
echo "🚀 Starting backend server..."
cd backend
python app.py
EOL

# Frontend run script
cat > run_frontend.sh << EOL
#!/bin/bash
echo "🚀 Starting frontend server..."
cd frontend
npm start
EOL

# Make scripts executable
chmod +x run_backend.sh
chmod +x run_frontend.sh

echo "✅ Run scripts created"

# Success message
echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Start the backend server:"
echo "   ./run_backend.sh"
echo ""
echo "2. In a new terminal, start the frontend:"
echo "   ./run_frontend.sh"
echo ""
echo "3. Open your browser and go to:"
echo "   http://localhost:3000"
echo ""
echo "📚 For more information, check the README.md file"
echo ""
echo "🔒 Security Note: Make sure to allow camera access when prompted by your browser"
echo ""