import React, { Suspense } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Alert,
  Skeleton,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  Visibility, 
  ViewInAr, 
  Image as ImageIcon,
  Fullscreen,
  Info
} from '@mui/icons-material';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';

// Simple 3D Model Component
function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1} />;
}

// 3D Model Viewer Component
function ModelViewer({ url, filename }) {
  return (
    <Box sx={{ width: '100%', height: 250, borderRadius: 2, overflow: 'hidden' }}>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: '#f5f5f7' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Model url={url} />
        </Suspense>
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          dampingFactor={0.1}
          enableDamping={true}
        />
        <Environment preset="city" />
      </Canvas>
    </Box>
  );
}

// Loading skeleton for 3D models
function ModelSkeleton() {
  return (
    <Box sx={{ width: '100%', height: 250, borderRadius: 2, overflow: 'hidden' }}>
      <Skeleton variant="rectangular" width="100%" height="100%" />
    </Box>
  );
}

function PreviewStep({ 
  files, 
  previews, 
  siteName,
  facilityType,
  locationEnvironment,
  initialObservations,
  specificConcerns
}) {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const is3DModel = (filename) => {
    if (!filename) return false;
    const ext = filename.split('.').pop().toLowerCase();
    return ['.glb', '.gltf', '.obj', '.fbx', '.stl'].includes(`.${ext}`);
  };

  const isImage = (filename) => {
    if (!filename) return false;
    const ext = filename.split('.').pop().toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp'].includes(`.${ext}`);
  };

  const getFileIcon = (filename) => {
    if (is3DModel(filename)) return <ViewInAr sx={{ fontSize: '1.2rem', color: '#007aff' }} />;
    if (isImage(filename)) return <ImageIcon sx={{ fontSize: '1.2rem', color: '#34c759' }} />;
    return null;
  };

  return (
    <Paper elevation={0} sx={{ p: 3, backgroundColor: '#fcfcfc', borderRadius: 2, border: '1px solid #e8e8ed' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Visibility sx={{ color: '#007aff', mr: 1 }} />
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1d1d1f' }}>
          Preview & Review
        </Typography>
      </Box>

      <Typography variant="body2" sx={{ color: '#6e6e73', mb: 3 }}>
        Review your site information and uploaded files before proceeding with the analysis.
      </Typography>

      {/* Site Information Summary */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#1d1d1f' }}>
          Site Information Summary
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card elevation={0} sx={{ p: 2, backgroundColor: '#ffffff', border: '1px solid #e8e8ed' }}>
              <Typography variant="body2" sx={{ color: '#6e6e73', fontWeight: 500 }}>
                Site Name
              </Typography>
              <Typography variant="body1" sx={{ color: '#1d1d1f', fontWeight: 600 }}>
                {siteName || 'Not specified'}
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={0} sx={{ p: 2, backgroundColor: '#ffffff', border: '1px solid #e8e8ed' }}>
              <Typography variant="body2" sx={{ color: '#6e6e73', fontWeight: 500 }}>
                Facility Type
              </Typography>
              <Typography variant="body1" sx={{ color: '#1d1d1f', fontWeight: 600 }}>
                {facilityType || 'Not specified'}
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={0} sx={{ p: 2, backgroundColor: '#ffffff', border: '1px solid #e8e8ed' }}>
              <Typography variant="body2" sx={{ color: '#6e6e73', fontWeight: 500 }}>
                Location Environment
              </Typography>
              <Typography variant="body1" sx={{ color: '#1d1d1f', fontWeight: 600 }}>
                {locationEnvironment || 'Not specified'}
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={0} sx={{ p: 2, backgroundColor: '#ffffff', border: '1px solid #e8e8ed' }}>
              <Typography variant="body2" sx={{ color: '#6e6e73', fontWeight: 500 }}>
                Files Uploaded
              </Typography>
              <Typography variant="body1" sx={{ color: '#1d1d1f', fontWeight: 600 }}>
                {files.length} file{files.length !== 1 ? 's' : ''}
              </Typography>
            </Card>
          </Grid>

          {initialObservations && (
            <Grid item xs={12}>
              <Card elevation={0} sx={{ p: 2, backgroundColor: '#ffffff', border: '1px solid #e8e8ed' }}>
                <Typography variant="body2" sx={{ color: '#6e6e73', fontWeight: 500, mb: 1 }}>
                  Initial Observations
                </Typography>
                <Typography variant="body1" sx={{ color: '#1d1d1f' }}>
                  {initialObservations}
                </Typography>
              </Card>
            </Grid>
          )}

          {specificConcerns && (
            <Grid item xs={12}>
              <Card elevation={0} sx={{ p: 2, backgroundColor: '#ffffff', border: '1px solid #e8e8ed' }}>
                <Typography variant="body2" sx={{ color: '#6e6e73', fontWeight: 500, mb: 1 }}>
                  Specific Concerns
                </Typography>
                <Typography variant="body1" sx={{ color: '#1d1d1f' }}>
                  {specificConcerns}
                </Typography>
              </Card>
            </Grid>
          )}
        </Grid>
      </Box>

      {/* File Preview */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#1d1d1f' }}>
          Uploaded Files ({files.length})
        </Typography>

        {files.length === 0 ? (
          <Alert severity="warning" sx={{ borderRadius: 2 }}>
            <Typography variant="body2">
              No files uploaded yet. Please go back to the Upload step to add visual evidence.
            </Typography>
          </Alert>
        ) : (
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
                      height="200"
                      image={previews[index]}
                      alt={file.name}
                      sx={{ objectFit: 'cover' }}
                    />
                  ) : is3DModel(file.name) ? (
                    <Suspense fallback={<ModelSkeleton />}>
                      <ModelViewer url={previews[index]} filename={file.name} />
                    </Suspense>
                  ) : (
                    <Box 
                      sx={{ 
                        height: 200, 
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
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      {getFileIcon(file.name)}
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: 500, 
                          ml: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          flex: 1
                        }}
                        title={file.name}
                      >
                        {file.name}
                      </Typography>
                    </Box>
                    
                    <Typography variant="caption" sx={{ color: '#6e6e73', display: 'block', mb: 1 }}>
                      {formatFileSize(file.size)}
                    </Typography>
                    
                    <Chip 
                      label={is3DModel(file.name) ? '3D Model' : 'Image'} 
                      size="small"
                      color={is3DModel(file.name) ? 'primary' : 'success'}
                      variant="outlined"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Analysis Ready Check */}
      <Alert severity={files.length > 0 ? 'success' : 'info'} sx={{ borderRadius: 2 }}>
        <Typography variant="body2">
          {files.length > 0 
            ? `✓ Ready for analysis with ${files.length} file${files.length !== 1 ? 's' : ''} and site information.`
            : 'Please upload at least one file to proceed with the security analysis.'
          }
        </Typography>
      </Alert>
    </Paper>
  );
}

export default PreviewStep;