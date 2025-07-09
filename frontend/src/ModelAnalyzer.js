import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import WizardSteps from './components/WizardSteps';
import SiteInfoStep from './components/SiteInfoStep';
import FileUploadStep from './components/FileUploadStep';
import PreviewStep from './components/PreviewStep';
import AnalysisStep from './components/AnalysisStep';
import './ModelAnalyzer.css';

// Supported file formats
const SUPPORTED_3D_FORMATS = ['.glb', '.gltf', '.obj', '.fbx', '.stl'];
const SUPPORTED_IMAGE_FORMATS = ['.jpg', '.jpeg', '.png', '.webp'];

function ModelAnalyzer() {
  // Wizard state management
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  
  // Form state management
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const fileInputRef = useRef(null);

  // Site information state
  const [siteName, setSiteName] = useState('');
  const [facilityType, setFacilityType] = useState('');
  const [locationEnvironment, setLocationEnvironment] = useState('');
  const [initialObservations, setInitialObservations] = useState('');
  const [specificConcerns, setSpecificConcerns] = useState('');

  // Wizard navigation functions
  const handleNext = () => {
    if (validateCurrentStep()) {
      setCompletedSteps(prev => [...prev, activeStep]);
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleStepClick = (step) => {
    if (step <= activeStep || completedSteps.includes(step)) {
      setActiveStep(step);
    }
  };

  // Form validation
  const validateCurrentStep = () => {
    const errors = {};
    
    if (activeStep === 0) {
      // Site Info validation
      if (!siteName.trim()) errors.siteName = 'Site name is required';
      if (!facilityType) errors.facilityType = 'Facility type is required';
      if (!locationEnvironment) errors.locationEnvironment = 'Location environment is required';
    } else if (activeStep === 1) {
      // File Upload validation
      if (files.length === 0) {
        setError('Please upload at least one file to proceed');
        return false;
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Get current step component
  const getCurrentStepComponent = () => {
    switch (activeStep) {
      case 0:
        return (
          <SiteInfoStep
            siteName={siteName}
            setSiteName={setSiteName}
            facilityType={facilityType}
            setFacilityType={setFacilityType}
            locationEnvironment={locationEnvironment}
            setLocationEnvironment={setLocationEnvironment}
            initialObservations={initialObservations}
            setInitialObservations={setInitialObservations}
            specificConcerns={specificConcerns}
            setSpecificConcerns={setSpecificConcerns}
            errors={formErrors}
          />
        );
      case 1:
        return (
          <FileUploadStep
            files={files}
            setFiles={setFiles}
            previews={previews}
            setPreviews={setPreviews}
            errors={error}
            setError={setError}
          />
        );
      case 2:
        return (
          <PreviewStep
            files={files}
            previews={previews}
            siteName={siteName}
            facilityType={facilityType}
            locationEnvironment={locationEnvironment}
            initialObservations={initialObservations}
            specificConcerns={specificConcerns}
          />
        );
      case 3:
        return (
          <AnalysisStep
            files={files}
            siteName={siteName}
            facilityType={facilityType}
            locationEnvironment={locationEnvironment}
            initialObservations={initialObservations}
            specificConcerns={specificConcerns}
            isLoading={isLoading}
            analysis={analysis}
            error={error}
            onStartAnalysis={handleStartAnalysis}
            onExportReport={handleExportReport}
            onRegenerateAnalysis={handleRegenerateAnalysis}
          />
        );
      default:
        return null;
    }
  };

  // Analysis functions
  const handleStartAnalysis = async () => {
    setIsLoading(true);
    setError('');
    setAnalysis('');

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
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportReport = () => {
    // TODO: Implement PDF export functionality
    console.log('Export report functionality to be implemented');
  };

  const handleRegenerateAnalysis = () => {
    setAnalysis('');
    handleStartAnalysis();
  };

  // Navigation button helpers
  const canGoNext = () => {
    if (activeStep === 0) return siteName && facilityType && locationEnvironment;
    if (activeStep === 1) return files.length > 0;
    if (activeStep === 2) return true;
    return false;
  };

  const getNextButtonText = () => {
    if (activeStep === 2) return 'Start Analysis';
    return 'Next';
  };

  const handleNextClick = () => {
    if (activeStep === 2) {
      handleNext();
      // Auto-start analysis when reaching the analysis step
      setTimeout(() => {
        if (files.length > 0) {
          handleStartAnalysis();
        }
      }, 500);
    } else {
      handleNext();
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
    <Container maxWidth="lg" sx={{ minHeight: '100vh', py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 2, color: '#1a1a2e' }}>
          Security Assessment Wizard
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#4a4a68', maxWidth: '800px', mx: 'auto' }}>
          Follow the step-by-step process to provide site information, upload visual evidence, and receive a comprehensive security assessment.
        </Typography>
      </Box>

      {/* Wizard Steps */}
      <WizardSteps 
        activeStep={activeStep} 
        completedSteps={completedSteps} 
        onStepClick={handleStepClick} 
      />

      {/* Current Step Content */}
      <Box sx={{ mb: 4 }}>
        {getCurrentStepComponent()}
      </Box>

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={handleBack}
          disabled={activeStep === 0}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 500,
            px: 3,
            py: 1,
            color: '#6e6e73',
            borderColor: '#d2d2d7',
            '&:hover': {
              borderColor: '#007aff',
              backgroundColor: '#f0f8ff'
            }
          }}
        >
          Back
        </Button>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {Array.from({ length: 4 }, (_, i) => (
            <Box
              key={i}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: i === activeStep ? '#007aff' : i < activeStep ? '#34c759' : '#d2d2d7',
                transition: 'all 0.2s ease'
              }}
            />
          ))}
        </Box>

        <Button
          variant="contained"
          endIcon={<ArrowForward />}
          onClick={handleNextClick}
          disabled={!canGoNext() || activeStep === 3}
          sx={{
            backgroundColor: '#007aff',
            '&:hover': { backgroundColor: '#006ee6' },
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 500,
            px: 3,
            py: 1
          }}
        >
          {getNextButtonText()}
        </Button>
      </Box>
    </Container>
  );
};

export default ModelAnalyzer;
