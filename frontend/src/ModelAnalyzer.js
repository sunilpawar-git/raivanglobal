import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useProgress, Html, useGLTF } from '@react-three/drei';
import ReactMarkdown from 'react-markdown';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import THREE, { logThreeClasses } from './three-extensions';
import './ModelAnalyzer.css';

// Supported 3D model file extensions
const SUPPORTED_3D_FORMATS = ['.glb', '.gltf', '.obj', '.fbx'];
const SUPPORTED_IMAGE_FORMATS = ['.jpg', '.jpeg', '.png', '.webp'];

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center style={{ color: 'white' }}>
      <div className="loading-text">{Math.round(progress)}% loaded</div>
    </Html>
  );
}

// Simple error boundary for model loading
class ModelErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Model Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Html center>
          <div className="error">
            <p>Failed to load model</p>
            <p>{this.state.error?.message || 'Unknown error occurred'}</p>
          </div>
        </Html>
      );
    }
    return this.props.children;
  }
}

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1} />;
}

function ModelAnalyzer() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileType, setFileType] = useState(null);
  const [modelError, setModelError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Check file type
    const fileExt = selectedFile.name.split('.').pop().toLowerCase();
    const fullFileType = `.${fileExt}`;
    
    if (![...SUPPORTED_3D_FORMATS, ...SUPPORTED_IMAGE_FORMATS].includes(fullFileType)) {
      setError(`Unsupported file type. Please upload one of: ${[...SUPPORTED_3D_FORMATS, ...SUPPORTED_IMAGE_FORMATS].join(', ')}`);
      return;
    }

    setFile(selectedFile);
    setFileType(fullFileType);
    setError('');
    setAnalysis('');
    setModelError(null);
    
    // Create preview for images
    if (SUPPORTED_IMAGE_FORMATS.includes(fullFileType)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const fileInput = fileInputRef.current;
      fileInput.files = e.dataTransfer.files;
      const event = new Event('change', { bubbles: true });
      fileInput.dispatchEvent(event);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file to analyze');
      return;
    }

    setIsLoading(true);
    setError('');
    setAnalysis('Analyzing model for security vulnerabilities...');

    const formData = new FormData();
    formData.append('model', file);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 300000); // 5 minute timeout
      
      const response = await fetch('/api/assess', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
        headers: {
          // Remove Content-Type header to let the browser set it with the correct boundary
        }
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error analyzing the model');
      }

      setAnalysis(data.analysis);
    } catch (err) {
      setError(err.message || 'Failed to analyze the model');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  

  

  // Check if file is a 3D model
  const is3DModel = (filename) => {
    if (!filename) return false;
    const ext = filename.split('.').pop().toLowerCase();
    return ['glb', 'gltf', 'obj', 'fbx'].includes(ext);
  };

  // Check if file is an image
  const isImage = (filename) => {
    if (!filename) return false;
    const ext = filename.split('.').pop().toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif'].includes(ext);
  };

  return (
    <div className="model-analyzer">
      <h1>3D Model Security Assessment</h1>
      <p className="subtitle">Upload a 3D model for security vulnerability analysis</p>
      
      <form 
        onSubmit={handleSubmit} 
        className="upload-form"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div 
          className={`file-upload ${file ? 'has-file' : ''}`}
          onClick={() => fileInputRef.current.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            id="model-upload"
            accept={[...SUPPORTED_3D_FORMATS, ...SUPPORTED_IMAGE_FORMATS].map(ext => `*${ext}`).join(',')}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <div className="upload-area">
            {file ? (
              <div className="file-info">
                <div className="file-name">{file.name}</div>
                <div className="file-size">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </div>
              </div>
            ) : (
              <>
                <div className="upload-icon">📁</div>
                <p>Drag & drop a 3D model file here, or click to select</p>
                <p className="file-types">
                  Supported formats: {[...SUPPORTED_3D_FORMATS, ...SUPPORTED_IMAGE_FORMATS].join(', ')}
                </p>
              </>
            )}
          </div>
        </div>
        
        <button 
          type="submit" 
          className="analyze-button"
          disabled={!file || isLoading}
        >
          {isLoading ? (
            <span className="button-loading">
              <span className="spinner"></span>
              Analyzing...
            </span>
          ) : (
            'Analyze for Security Issues'
          )}
        </button>
        
        {error && <div className="error-message">{error}</div>}
      </form>
      <div className="results-container">
        <div className="preview-section">
          <h3>Model Preview</h3>
          {preview ? (
            <div className="preview-content">
              {is3DModel(file?.name) ? (
                <div className="model-viewer-container">
                  <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <Suspense fallback={<Loader />}>
                      <ambientLight intensity={0.5} />
                      <pointLight position={[10, 10, 10]} />
                      <Model 
                        url={preview} 
                        fileType={fileType} 
                        onError={(error) => setModelError(error)} 
                      />
                      <OrbitControls 
                        enablePan={true}
                        enableZoom={true}
                        enableRotate={true}
                      />
                      <Environment preset="city" />
                    </Suspense>
                  </Canvas>
                </div>
              ) : isImage(file?.name) ? (
                <img src={preview} alt="Preview" className="preview-image" />
              ) : (
                <div className="unsupported-format">
                  <p>Unsupported file format for preview</p>
                </div>
              )}
            </div>
          ) : (
            <div className="preview-placeholder">
              <p>Upload a 3D model to see preview</p>
            </div>
          )}
        </div>
        <div className="analysis-section">
          <h3>Security Analysis</h3>
          <div className="analysis-content">
            {isLoading ? (
              <div className="loading-analysis">
                <div className="spinner"></div>
                <p>Analyzing model for security vulnerabilities...</p>
              </div>
            ) : analysis ? (
              <div className="analysis-results markdown-body">
                <ReactMarkdown
                  components={{
                    h1: ({node, ...props}) => <h2 {...props} className="analysis-heading" />,
                    h2: ({node, ...props}) => <h3 {...props} className="analysis-subheading" />,
                    h3: ({node, ...props}) => <h4 {...props} className="analysis-subheading" />,
                    ul: ({node, ...props}) => <ul {...props} className="analysis-list" />,
                  img: ({node, ...props}) => (
                    <img style={{maxWidth: '100%'}} {...props} alt={props.alt || ''} />
                  ),
                }}
              >
                {analysis}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="no-analysis">
              <div className="info-icon">ℹ️</div>
              <h4>No analysis results yet</h4>
              <p>Upload and analyze a 3D model to see security assessment results.</p>
              <div className="analysis-tips">
                <p><strong>Tip:</strong> For best results, upload a 3D model file in one of these formats:</p>
                <ul>
                  <li><strong>.glb/.gltf</strong> - Binary/JSON GL Transmission Format</li>
                  <li><strong>.obj</strong> - Wavefront OBJ format</li>
                  <li><strong>.fbx</strong> - Autodesk Filmbox format</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
}

export default ModelAnalyzer;
