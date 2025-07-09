import React from 'react';
import { 
  Box, 
  Stepper, 
  Step, 
  StepLabel, 
  StepContent, 
  Typography, 
  Button, 
  LinearProgress,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  LocationOn, 
  CloudUpload, 
  Visibility, 
  Assessment 
} from '@mui/icons-material';

const steps = [
  {
    label: 'Site Information',
    description: 'Provide details about your location',
    icon: <LocationOn />,
    component: 'SiteInfo'
  },
  {
    label: 'Upload Files',
    description: 'Upload images and 3D models',
    icon: <CloudUpload />,
    component: 'FileUpload'
  },
  {
    label: 'Preview & Review',
    description: 'Review uploaded content',
    icon: <Visibility />,
    component: 'Preview'
  },
  {
    label: 'Analysis Results',
    description: 'View security assessment',
    icon: <Assessment />,
    component: 'Results'
  }
];

function WizardSteps({ activeStep, completedSteps, onStepClick }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobile) {
    // Mobile progress bar
    return (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
          Step {activeStep + 1} of {steps.length}: {steps[activeStep].label}
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={(activeStep / (steps.length - 1)) * 100}
          sx={{ 
            height: 8, 
            borderRadius: 4,
            backgroundColor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#007aff',
              borderRadius: 4
            }
          }}
        />
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          mt: 2,
          color: '#6e6e73'
        }}>
          {steps[activeStep].icon}
          <Typography variant="body2" sx={{ ml: 1 }}>
            {steps[activeStep].description}
          </Typography>
        </Box>
      </Box>
    );
  }

  // Desktop stepper
  return (
    <Box sx={{ mb: 4 }}>
      <Stepper 
        activeStep={activeStep} 
        orientation="horizontal"
        sx={{
          '& .MuiStepLabel-root': {
            cursor: 'pointer'
          },
          '& .MuiStepIcon-root': {
            fontSize: '1.5rem',
            '&.Mui-active': {
              color: '#007aff'
            },
            '&.Mui-completed': {
              color: '#34c759'
            }
          },
          '& .MuiStepLabel-label': {
            fontWeight: 500,
            '&.Mui-active': {
              color: '#007aff',
              fontWeight: 600
            },
            '&.Mui-completed': {
              color: '#34c759',
              fontWeight: 600
            }
          }
        }}
      >
        {steps.map((step, index) => (
          <Step key={step.label} completed={completedSteps.includes(index)}>
            <StepLabel 
              onClick={() => onStepClick && onStepClick(index)}
              sx={{ cursor: 'pointer' }}
              icon={step.icon}
            >
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {step.label}
                </Typography>
                <Typography variant="body2" sx={{ color: '#6e6e73' }}>
                  {step.description}
                </Typography>
              </Box>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export default WizardSteps;