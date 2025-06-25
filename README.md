# 3D Model Security Assessment Tool

A web application that analyzes 3D models and images for potential security vulnerabilities using AI.

## Features
- Upload 3D models or images for security analysis
- AI-powered vulnerability detection
- Detailed security assessment reports
- User-friendly interface
- Real-time analysis feedback

## Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)
- OpenAI API key (for AI analysis)

## Setup

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with your OpenAI API key:
```env
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=development
```

4. Start the backend server:
```bash
npm start
```

### Frontend Setup
1. In a new terminal, navigate to the frontend directory:
```bash
cd frontend
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage
1. Click "Choose 3D Model File" to upload a 3D model or image
2. Click "Analyze for Security Issues" to start the analysis
3. View the security assessment results in the right panel

## Supported File Formats
- 3D Models: .glb, .gltf, .obj, .fbx, .stl
- Images: .jpg, .jpeg, .png

## Technologies Used
- Frontend: React.js, Material-UI
- Backend: Node.js, Express
- AI: OpenAI GPT-4 Vision API
- 3D Model Processing: Custom analysis pipeline

## Environment Variables
- `PORT`: The port on which the backend server runs (default: 5000)
- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `NODE_ENV`: The environment (development/production)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
