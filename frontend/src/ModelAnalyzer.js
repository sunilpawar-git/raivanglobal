import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
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
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
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
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length === 0) return;

    const newFiles = [];
    const newPreviews = [];
    let hasError = false;

    selectedFiles.forEach(selectedFile => {
      const fileExt = selectedFile.name.split('.').pop().toLowerCase();
      const fullFileType = `.${fileExt}`;
      
      if (![...SUPPORTED_3D_FORMATS, ...SUPPORTED_IMAGE_FORMATS].includes(fullFileType)) {
        setError(`Unsupported file type: ${selectedFile.name}. Only 3D models and images are allowed.`);
        hasError = true;
        return;
      }
      newFiles.push(selectedFile);
      newPreviews.push(URL.createObjectURL(selectedFile));
    });

    if (hasError) {
      setFiles([]);
      setPreviews([]);
      setAnalysis('');
      return;
    }

    setFiles(newFiles);
    setPreviews(newPreviews);
    setError('');
    setAnalysis('');
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
    
    if (files.length === 0) {
      setError('Please select at least one file to analyze');
      return;
    }

    setIsLoading(true);
    setError('');
    setAnalysis('Analyzing your models, please wait...');

    const formData = new FormData();
    files.forEach(file => {
      formData.append('models', file); 
    });
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
      previews.forEach(previewUrl => {
        URL.revokeObjectURL(previewUrl);
      });
    };
  }, [previews]);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', p: 3 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 2, color: '#1a1a2e' }}>
          Security Audit Request
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#4a4a68', maxWidth: '800px', mx: 'auto' }}>
          Please fill out the form below with details about your business location to receive a comprehensive security assessment. 
          Our team will analyze the information and provide tailored recommendations to enhance your security posture.
        </Typography>
      </Box>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept={[...SUPPORTED_3D_FORMATS, ...SUPPORTED_IMAGE_FORMATS].join(',')}
        multiple // Allow multiple file selection
      />
      
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
          <select
            id="facilityType"
            value={facilityType}
            onChange={(e) => setFacilityType(e.target.value)}
          >
            <option value="">Select Facility Type</option>
            <option value="Commercial Office">Commercial Office</option>
            <option value="Industrial Plant">Industrial Plant</option>
            <option value="Retail Store">Retail Store</option>
            <option value="Residential Complex">Residential Complex</option>
            <option value="Data Center">Data Center</option>
            <option value="Healthcare Facility">Healthcare Facility</option>
            <option value="Educational Institution">Educational Institution</option>
            <option value="Government Building">Government Building</option>
            <option value="Transportation Hub">Transportation Hub</option>
            <option value="Warehouse/Logistics">Warehouse/Logistics</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="locationEnvironment">Location Environment:</label>
          <select
            id="locationEnvironment"
            value={locationEnvironment}
            onChange={(e) => setLocationEnvironment(e.target.value)}
          >
            <option value="">Select Environment</option>
            <option value="Urban">Urban</option>
            <option value="Rural">Rural</option>
            <option value="Suburban">Suburban</option>
            <option value="Remote">Remote</option>
            <option value="Coastal">Coastal</option>
            <option value="Mountainous">Mountainous</option>
            <option value="Industrial Zone">Industrial Zone</option>
            <option value="Commercial District">Commercial District</option>
            <option value="Residential Area">Residential Area</option>
            <option value="Other">Other</option>
          </select>
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
        <p>Drag & drop your files here, or click to select</p>
        <p className="file-types">
          Supported formats: {[...SUPPORTED_3D_FORMATS, ...SUPPORTED_IMAGE_FORMATS].join(', ')}
        </p>
      </div>

      {error && <div className="error-message">{error}</div>}
      
      {/* Selected File Info */}
      {files.length > 0 && (
        <div className="file-info-container">
          {files.map((file, index) => (
            <div key={index} className="file-info">
              <p>Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</p>
              <button 
                onClick={() => {
                  const newFiles = files.filter((_, i) => i !== index);
                  const newPreviews = previews.filter((_, i) => i !== index);
                  setFiles(newFiles);
                  setPreviews(newPreviews);
                  if (newFiles.length === 0) {
                    setAnalysis('');
                    fileInputRef.current.value = '';
                  }
                }}
                className="clear-button"
              >
                Clear
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Preview Section */}
      <div className="preview-container">
        {previews.length > 0 ? (
          <div className="model-viewer-grid">
            {previews.map((previewUrl, index) => (
              <div key={index} className="model-viewer">
                {is3DModel(files[index]?.name) ? (
                  <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <Model url={previewUrl} />
                    <OrbitControls 
                      enablePan={true}
                      enableZoom={true}
                      enableRotate={true}
                    />
                    <Environment preset="city" />
                  </Canvas>
                ) : isImage(files[index]?.name) ? (
                  <img src={previewUrl} alt="Preview" className="preview-image" />
                ) : (
                  <div className="unsupported-format">
                    <p>Preview not available for this file type</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="preview-placeholder">
            <p>No file selected for preview</p>
          </div>
        )}
      </div>

      {/* Analyze Button */}
      <form onSubmit={handleSubmit}>
        <div className="analyze-button-container">
          <button
            type="submit"
            disabled={isLoading || files.length === 0}
            className="analyze-button"
          >
            {isLoading ? 'Analyzing...' : 'Analyze for Security Assessment'}
          </button>
        </div>
      </form>

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
    </Box>
  );
};

export default ModelAnalyzer;
