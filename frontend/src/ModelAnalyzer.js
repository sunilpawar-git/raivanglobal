import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import ReactMarkdown from 'react-markdown';
import './ModelAnalyzer.css';

// Supported file formats
const SUPPORTED_3D_FORMATS = ['.glb', '.gltf', '.obj', '.fbx'];
const SUPPORTED_IMAGE_FORMATS = ['.jpg', '.jpeg', '.png', '.webp'];

// Simple 3D Model Component
function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1} />;
}

function ModelAnalyzer() {
  // State management
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  // New state variables for contextual information
  const [siteName, setSiteName] = useState('');
  const [facilityType, setFacilityType] = useState('');
  const [locationEnvironment, setLocationEnvironment] = useState('');
  const [initialObservations, setInitialObservations] = useState('');
  const [specificConcerns, setSpecificConcerns] = useState('');

  // Check if file is a 3D model
  const is3DModel = (filename) => {
    if (!filename) return false;
    const ext = filename.split('.').pop().toLowerCase();
    return SUPPORTED_3D_FORMATS.includes(`.${ext}`);
  };

  // Check if file is an image
  const isImage = (filename) => {
    if (!filename) return false;
    const ext = filename.split('.').pop().toLowerCase();
    return SUPPORTED_IMAGE_FORMATS.includes(`.${ext}`);
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const fileExt = selectedFile.name.split('.').pop().toLowerCase();
    const fullFileType = `.${fileExt}`;
    
    if (![...SUPPORTED_3D_FORMATS, ...SUPPORTED_IMAGE_FORMATS].includes(fullFileType)) {
      setError(`Unsupported file type. Please upload one of: ${[...SUPPORTED_3D_FORMATS, ...SUPPORTED_IMAGE_FORMATS].join(', ')}`);
      return;
    }

    setFile(selectedFile);
    setError('');
    setAnalysis('');
    
    // Create preview URL
    const fileUrl = URL.createObjectURL(selectedFile);
    setPreview(fileUrl);
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files?.length > 0) {
      const fileInput = fileInputRef.current;
      fileInput.files = e.dataTransfer.files;
      const event = new Event('change', { bubbles: true });
      fileInput.dispatchEvent(event);
    }
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file to analyze');
      return;
    }

    setIsLoading(true);
    setError('');
    setAnalysis('Analyzing your model, please wait...');

    const formData = new FormData();
    formData.append('models', file); // Changed from 'model' to 'models' as backend expects 'models' array
    formData.append('siteName', siteName);
    formData.append('facilityType', facilityType);
    formData.append('locationEnvironment', locationEnvironment);
    formData.append('initialObservations', initialObservations);
    formData.append('specificConcerns', specificConcerns);

    try {
      const response = await fetch('http://localhost:5001/api/assess', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`);
      }

      const result = await response.json();
      setAnalysis(result.analysis || 'No analysis results available');
    } catch (err) {
      setError(err.message || 'An error occurred during analysis');
      setAnalysis('');
    } finally {
      setIsLoading(false);
    }
  };

  // Clean up preview URLs on unmount
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="model-analyzer">
      <div className="upload-section">
        <h2>Security Site Analyzer</h2>

        {/* Contextual Information Inputs */}
        <div className="context-inputs">
          <div className="input-group">
            <label htmlFor="siteName">Site Name:</label>
            <input
              type="text"
              id="siteName"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              placeholder="e.g., Main Office Building, Warehouse A"
            />
          </div>
          <div className="input-group">
            <label htmlFor="facilityType">Facility Type:</label>
            <input
              type="text"
              id="facilityType"
              value={facilityType}
              onChange={(e) => setFacilityType(e.target.value)}
              placeholder="e.g., Commercial Office, Industrial Plant, Retail Store"
            />
          </div>
          <div className="input-group">
            <label htmlFor="locationEnvironment">Location Environment:</label>
            <input
              type="text"
              id="locationEnvironment"
              value={locationEnvironment}
              onChange={(e) => setLocationEnvironment(e.target.value)}
              placeholder="e.g., Urban, Rural, Suburban, Remote"
            />
          </div>
          <div className="input-group">
            <label htmlFor="initialObservations">Initial Observations:</label>
            <textarea
              id="initialObservations"
              value={initialObservations}
              onChange={(e) => setInitialObservations(e.target.value)}
              placeholder="e.g., Appears well-maintained, some overgrown foliage, visible security cameras"
              rows="3"
            ></textarea>
          </div>
          <div className="input-group">
            <label htmlFor="specificConcerns">Specific Concerns (if any):</label>
            <textarea
              id="specificConcerns"
              value={specificConcerns}
              onChange={(e) => setSpecificConcerns(e.target.value)}
              placeholder="e.g., Broken gate on west side, unlit back entrance, suspicious loitering"
              rows="3"
            ></textarea>
          </div>
        </div>

        <h2>Upload Visual Evidence</h2>
        
        {/* File Upload Area */}
        <div 
          className="drop-zone" 
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept={[...SUPPORTED_3D_FORMATS, ...SUPPORTED_IMAGE_FORMATS].join(',')}
            style={{ display: 'none' }}
          />
          <p>Drag & drop your 3D model here, or click to select</p>
          <p className="file-types">
            Supported formats: {[...SUPPORTED_3D_FORMATS, ...SUPPORTED_IMAGE_FORMATS].join(', ')}
          </p>
        </div>

        {error && <div className="error-message">{error}</div>}
        
        {/* Selected File Info */}
        {file && (
          <div className="file-info">
            <p>Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</p>
            <button 
              onClick={() => {
                setFile(null);
                setPreview(null);
                setAnalysis('');
                fileInputRef.current.value = '';
              }}
              className="clear-button"
            >
              Clear
            </button>
          </div>
        )}

        {/* Preview Section */}
        <div className="preview-container">
          {preview ? (
            <div className="model-viewer">
              {is3DModel(file?.name) ? (
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <Model url={preview} />
                  <OrbitControls 
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                  />
                  <Environment preset="city" />
                </Canvas>
              ) : isImage(file?.name) ? (
                <img src={preview} alt="Preview" className="preview-image" />
              ) : (
                <div className="unsupported-format">
                  <p>Preview not available for this file type</p>
                </div>
              )}
            </div>
          ) : (
            <div className="preview-placeholder">
              <p>No file selected for preview</p>
            </div>
          )}
        </div>

        {/* Analyze Button */}
        <form onSubmit={handleSubmit}>
          <button
            type="submit"
            disabled={isLoading || !file}
            className="analyze-button"
          >
            {isLoading ? 'Analyzing...' : 'Analyze Model'}
          </button>
        </form>
      </div>
      <div className="analysis-section">
        <h3>Security Assessment Report</h3>
        <div className="analysis-content">
          {isLoading ? (
            <div className="loading-analysis">
              <div className="spinner"></div>
              <p>Generating security assessment report...</p>
            </div>
          ) : analysis ? (
            <div className="analysis-results markdown-body">
              <ReactMarkdown
                components={{
                  h1: ({ node, children, ...props }) => (
                    <h2 {...props} className="analysis-heading">
                      {children}
                    </h2>
                  ),
                  h2: ({ node, children, ...props }) => (
                    <h3 {...props} className="analysis-subheading">
                      {children}
                    </h3>
                  ),
                  h3: ({ node, children, ...props }) => (
                    <h4 {...props} className="analysis-subheading">
                      {children}
                    </h4>
                  ),
                  ul: ({ node, ordered, children, ...props }) => (
                    <ul {...props} className="analysis-list">
                      {children}
                    </ul>
                  ),
                  img: ({ node, ...props }) => (
                    <img
                      style={{ maxWidth: '100%' }}
                      {...props}
                      alt={props.alt || ''}
                    />
                  ),
                }}
              >
                {analysis}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="no-analysis">
              <div className="info-icon">ℹ️</div>
              <h4>No report generated yet</h4>
              <p>Upload images and provide contextual information to generate a security assessment report.</p>
              <div className="analysis-tips">
                <p>
                  <strong>Tip:</strong> Provide as much detail as possible in the context fields for a more accurate assessment.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModelAnalyzer;
