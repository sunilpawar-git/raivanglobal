import React, { useState } from 'react';
import './ModelAnalyzer.css';

function ModelAnalyzer() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file to analyze');
      return;
    }

    setIsLoading(true);
    setError('');
    setAnalysis('');

    const formData = new FormData();
    formData.append('model', file);

    try {
      const response = await fetch('http://localhost:5001/api/assess', {
        method: 'POST',
        body: formData,
      });

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

  return (
    <div className="model-analyzer">
      <h1>3D Model Security Assessment</h1>
      <p className="subtitle">Upload a 3D model for security vulnerability analysis</p>
      
      <div className="upload-container">
        <form onSubmit={handleSubmit}>
          <div className="file-upload">
            <input
              type="file"
              id="model-upload"
              accept=".glb,.gltf,.obj,.fbx,.stl,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              disabled={isLoading}
            />
            <label htmlFor="model-upload" className="upload-button">
              {file ? file.name : 'Choose 3D Model File'}
            </label>
          </div>
          
          <button 
            type="submit" 
            className="analyze-button"
            disabled={!file || isLoading}
          >
            {isLoading ? 'Analyzing...' : 'Analyze for Security Issues'}
          </button>
        </form>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="results-container">
        <div className="preview-section">
          <h3>Model Preview</h3>
          {preview ? (
            <div className="preview-content">
              {file.name.endsWith('.glb') || file.name.endsWith('.gltf') || 
               file.name.endsWith('.obj') || file.name.endsWith('.fbx') ? (
                <div className="model-preview">
                  <p>3D model preview would be shown here</p>
                  <p>File: {file.name}</p>
                </div>
              ) : (
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="image-preview"
                />
              )}
            </div>
          ) : (
            <div className="preview-placeholder">
              <p>Preview will appear here</p>
            </div>
          )}
        </div>

        <div className="analysis-section">
          <h3>Security Analysis</h3>
          <div className="analysis-content">
            {isLoading ? (
              <div className="loading">
                <div className="spinner"></div>
                <p>Analyzing model for security vulnerabilities...</p>
              </div>
            ) : analysis ? (
              <div className="analysis-results">
                <h4>Analysis Results:</h4>
                <div className="analysis-text">
                  {analysis.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            ) : (
              <div className="analysis-placeholder">
                <p>Analysis results will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModelAnalyzer;
