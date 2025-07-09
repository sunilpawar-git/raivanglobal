import React, { useRef, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Grid,
  LinearProgress,
  Alert,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  CardActions
} from '@mui/material';
import { 
  CloudUpload, 
  Delete, 
  Image as ImageIcon,
  ViewInAr,
  InsertDriveFile,
  CheckCircle,
  Cancel
} from '@mui/icons-material';

// Supported file formats
const SUPPORTED_3D_FORMATS = ['.glb', '.gltf', '.obj', '.fbx', '.stl'];
const SUPPORTED_IMAGE_FORMATS = ['.jpg', '.jpeg', '.png', '.webp'];
const ALL_FORMATS = [...SUPPORTED_3D_FORMATS, ...SUPPORTED_IMAGE_FORMATS];

function FileUploadStep({ 
  files, 
  setFiles,
  previews,
  setPreviews,
  errors,
  setError,
  uploadProgress = {}
}) {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  // Helper functions
  const is3DModel = (filename) => {
    if (!filename) return false;
    const ext = filename.split('.').pop().toLowerCase();
    return SUPPORTED_3D_FORMATS.includes(`.${ext}`);
  };

  const isImage = (filename) => {
    if (!filename) return false;
    const ext = filename.split('.').pop().toLowerCase();
    return SUPPORTED_IMAGE_FORMATS.includes(`.${ext}`);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (filename) => {
    if (is3DModel(filename)) return <ViewInAr sx={{ fontSize: '2rem', color: '#007aff' }} />;
    if (isImage(filename)) return <ImageIcon sx={{ fontSize: '2rem', color: '#34c759' }} />;
    return <InsertDriveFile sx={{ fontSize: '2rem', color: '#6e6e73' }} />;
  };

  // Handle file selection
  const handleFileChange = (selectedFiles) => {
    const newFiles = [];
    const newPreviews = [];
    let hasError = false;

    Array.from(selectedFiles).forEach(selectedFile => {
      const fileExt = selectedFile.name.split('.').pop().toLowerCase();
      const fullFileType = `.${fileExt}`;
      
      if (!ALL_FORMATS.includes(fullFileType)) {
        setError(`Unsupported file type: ${selectedFile.name}. Only 3D models and images are allowed.`);
        hasError = true;
        return;
      }

      if (selectedFile.size > 100 * 1024 * 1024) { // 100MB limit
        setError(`File ${selectedFile.name} is too large. Maximum size is 100MB.`);
        hasError = true;
        return;
      }

      newFiles.push(selectedFile);
      newPreviews.push(URL.createObjectURL(selectedFile));
    });

    if (hasError) return;

    setFiles(prev => [...prev, ...newFiles]);
    setPreviews(prev => [...prev, ...newPreviews]);
    setError('');
  };

  // Handle file input change
  const handleInputChange = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles.length > 0) {
      handleFileChange(selectedFiles);
    }
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files?.length > 0) {
      handleFileChange(e.dataTransfer.files);
    }
  };

  // Handle drag events
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  // Remove file
  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    
    // Revoke object URL to free memory
    URL.revokeObjectURL(previews[index]);
    
    setFiles(newFiles);
    setPreviews(newPreviews);
    if (newFiles.length === 0) {
      setError('');
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 3, backgroundColor: '#fcfcfc', borderRadius: 2, border: '1px solid #e8e8ed' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <CloudUpload sx={{ color: '#007aff', mr: 1 }} />
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1d1d1f' }}>
          Upload Visual Evidence
        </Typography>
      </Box>

      <Typography variant="body2" sx={{ color: '#6e6e73', mb: 3 }}>
        Upload images and 3D models to provide visual context for your security assessment.
      </Typography>

      {/* File Upload Drop Zone */}
      <Box
        sx={{
          border: dragActive ? '2px dashed #007aff' : '2px dashed #d2d2d7',
          borderRadius: 3,
          p: 4,
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          backgroundColor: dragActive ? '#f0f8ff' : '#ffffff',
          '&:hover': {
            borderColor: '#007aff',
            backgroundColor: '#f9f9f9'
          },
          mb: 3
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleInputChange}
          accept={ALL_FORMATS.join(',')}
          multiple
        />
        
        <CloudUpload sx={{ fontSize: '3rem', color: dragActive ? '#007aff' : '#b0b0b5', mb: 2 }} />
        
        <Typography variant="h6" sx={{ fontWeight: 500, color: '#1d1d1f', mb: 1 }}>
          {dragActive ? 'Drop files here' : 'Drag & drop files here'}
        </Typography>
        
        <Typography variant="body2" sx={{ color: '#6e6e73', mb: 2 }}>
          or click to browse
        </Typography>
        
        <Button
          variant="outlined"
          size="small"
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            color: '#007aff',
            borderColor: '#007aff',
            '&:hover': {
              borderColor: '#006ee6',
              backgroundColor: '#f0f8ff'
            }
          }}
        >
          Choose Files
        </Button>
        
        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
          {SUPPORTED_IMAGE_FORMATS.map((format) => (
            <Chip 
              key={format} 
              label={format} 
              size="small" 
              variant="outlined"
              sx={{ fontSize: '0.7rem', color: '#34c759', borderColor: '#34c759' }}
            />
          ))}
          {SUPPORTED_3D_FORMATS.map((format) => (
            <Chip 
              key={format} 
              label={format} 
              size="small" 
              variant="outlined"
              sx={{ fontSize: '0.7rem', color: '#007aff', borderColor: '#007aff' }}
            />
          ))}
        </Box>
      </Box>

      {/* Error Message */}
      {errors && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {errors}
        </Alert>
      )}

      {/* File List */}
      {files.length > 0 && (
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            Uploaded Files ({files.length})
          </Typography>
          
          <Grid container spacing={2}>
            {files.map((file, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  elevation={0}
                  sx={{ 
                    border: '1px solid #e8e8ed',
                    borderRadius: 2,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  {isImage(file.name) ? (
                    <CardMedia
                      component="img"
                      height="140"
                      image={previews[index]}
                      alt={file.name}
                      sx={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <Box 
                      sx={{ 
                        height: 140, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        backgroundColor: '#f9f9f9'
                      }}
                    >
                      {getFileIcon(file.name)}
                    </Box>
                  )}
                  
                  <CardContent sx={{ p: 2 }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 500, 
                        mb: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                      title={file.name}
                    >
                      {file.name}
                    </Typography>
                    
                    <Typography variant="caption" sx={{ color: '#6e6e73', display: 'block' }}>
                      {formatFileSize(file.size)}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <Chip 
                        label={is3DModel(file.name) ? '3D Model' : 'Image'} 
                        size="small"
                        color={is3DModel(file.name) ? 'primary' : 'success'}
                        variant="outlined"
                        sx={{ fontSize: '0.7rem' }}
                      />
                      {uploadProgress[index] !== undefined && (
                        <Box sx={{ ml: 1, flex: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={uploadProgress[index]} 
                            sx={{ height: 4, borderRadius: 2 }}
                          />
                        </Box>
                      )}
                    </Box>
                  </CardContent>
                  
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <IconButton 
                      onClick={() => removeFile(index)}
                      size="small"
                      sx={{ 
                        color: '#ff3b30',
                        '&:hover': { 
                          backgroundColor: '#fff0f0' 
                        }
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Upload Tips */}
      <Alert severity="info" sx={{ mt: 3, borderRadius: 2 }}>
        <Typography variant="body2">
          <strong>Upload Tips:</strong> Include multiple angles and perspectives for better analysis. 
          Maximum file size: 100MB. Supported formats: Images ({SUPPORTED_IMAGE_FORMATS.join(', ')}) and 3D Models ({SUPPORTED_3D_FORMATS.join(', ')}).
        </Typography>
      </Alert>
    </Paper>
  );
}

export default FileUploadStep;