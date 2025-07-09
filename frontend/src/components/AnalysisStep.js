import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Alert,
  Skeleton,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  Assessment, 
  GetApp, 
  Refresh,
  CheckCircle,
  Warning,
  Error as ErrorIcon,
  Info
} from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';

// Analysis progress stages
const ANALYSIS_STAGES = [
  { label: 'Initializing analysis', progress: 10 },
  { label: 'Processing uploaded files', progress: 25 },
  { label: 'Analyzing visual evidence', progress: 50 },
  { label: 'Generating security assessment', progress: 75 },
  { label: 'Finalizing report', progress: 90 },
  { label: 'Complete', progress: 100 }
];

// Enhanced loading skeleton
function AnalysisLoadingSkeleton({ currentStage = 0, progress = 0 }) {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Assessment sx={{ color: '#007aff', mr: 1 }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Analyzing Security Assessment
        </Typography>
      </Box>

      <Card elevation={0} sx={{ mb: 3, border: '1px solid #e8e8ed' }}>
        <CardContent>
          <Typography variant="body2" sx={{ color: '#6e6e73', mb: 2 }}>
            {ANALYSIS_STAGES[currentStage]?.label || 'Processing...'}
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
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
          <Typography variant="caption" sx={{ color: '#6e6e73', mt: 1, display: 'block' }}>
            {progress}% complete
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Skeleton variant="text" width="60%" height={40} />
        <Skeleton variant="rectangular" width="100%" height={120} />
        <Skeleton variant="text" width="80%" height={30} />
        <Skeleton variant="rectangular" width="100%" height={80} />
        <Skeleton variant="text" width="70%" height={30} />
        <Skeleton variant="rectangular" width="100%" height={100} />
      </Box>
    </Box>
  );
}

// Analysis result component
function AnalysisResult({ analysis, onExport, onRegenerate, isLoading }) {
  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high': return '#ff3b30';
      case 'medium': return '#ff9500';
      case 'low': return '#34c759';
      default: return '#6e6e73';
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 3, backgroundColor: '#fcfcfc', borderRadius: 2, border: '1px solid #e8e8ed' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CheckCircle sx={{ color: '#34c759', mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#1d1d1f' }}>
            Security Assessment Complete
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Export Report">
            <IconButton 
              onClick={onExport}
              disabled={isLoading}
              sx={{ 
                color: '#007aff',
                '&:hover': { backgroundColor: '#f0f8ff' }
              }}
            >
              <GetApp />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Regenerate Analysis">
            <IconButton 
              onClick={onRegenerate}
              disabled={isLoading}
              sx={{ 
                color: '#6e6e73',
                '&:hover': { backgroundColor: '#f0f0f0' }
              }}
            >
              <Refresh />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
        <Typography variant="body2">
          Your security assessment has been completed successfully. Review the findings and recommendations below.
        </Typography>
      </Alert>

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ 
        backgroundColor: '#ffffff', 
        borderRadius: 2, 
        p: 3,
        border: '1px solid #e8e8ed',
        '& .markdown-body': {
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          fontSize: '0.95rem',
          lineHeight: 1.6,
          color: '#1d1d1f',
          
          '& h1, & h2, & h3, & h4, & h5, & h6': {
            fontWeight: 600,
            lineHeight: 1.3,
            marginTop: '1.5em',
            marginBottom: '0.8em',
            color: '#1d1d1f'
          },
          
          '& h1': { fontSize: '1.7em', borderBottom: 'none', paddingBottom: 0 },
          '& h2': { fontSize: '1.4em' },
          '& h3': { fontSize: '1.2em' },
          '& h4': { fontSize: '1.05em' },
          
          '& p': { marginBottom: '0.8em' },
          
          '& ul, & ol': { 
            paddingLeft: '1.5em',
            marginBottom: '0.8em'
          },
          
          '& li': { marginBottom: '0.4em' },
          
          '& strong': { fontWeight: 600 },
          
          '& code': {
            backgroundColor: '#e8e8ed',
            borderRadius: '5px',
            padding: '0.2em 0.4em',
            fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace',
            fontSize: '0.85em',
            color: '#c2185b'
          },
          
          '& pre': {
            backgroundColor: '#2c2c2e',
            color: '#f2f2f7',
            borderRadius: '8px',
            fontSize: '0.85em',
            lineHeight: 1.4,
            overflowX: 'auto',
            padding: '1em',
            marginBottom: '1em',
            
            '& > code': {
              backgroundColor: 'transparent',
              border: 0,
              display: 'block',
              padding: 0,
              color: 'inherit'
            }
          },
          
          '& blockquote': {
            borderLeft: '4px solid #b0b0b5',
            color: '#6e6e73',
            margin: '1em 0',
            padding: '0.5em 1em',
            backgroundColor: '#f5f5f7',
            borderRadius: '6px'
          },
          
          '& table': {
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '1em',
            fontSize: '0.85em',
            
            '& th, & td': {
              border: '1px solid #e0e0e0',
              padding: '0.7em',
              textAlign: 'left'
            },
            
            '& th': {
              backgroundColor: '#f8f8f8',
              fontWeight: 600,
              color: '#424245'
            },
            
            '& tr:nth-child(even)': {
              backgroundColor: '#fcfcfc'
            }
          }
        }
      }}>
        <ReactMarkdown className="markdown-body">
          {analysis}
        </ReactMarkdown>
      </Box>
    </Paper>
  );
}

function AnalysisStep({ 
  files, 
  siteName,
  facilityType,
  locationEnvironment,
  initialObservations,
  specificConcerns,
  isLoading,
  analysis,
  error,
  onStartAnalysis,
  onExportReport,
  onRegenerateAnalysis
}) {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);

  // Simulate progress stages during loading
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 2;
          
          // Update stage based on progress
          const stage = ANALYSIS_STAGES.findIndex(s => s.progress > newProgress);
          setCurrentStage(stage === -1 ? ANALYSIS_STAGES.length - 1 : Math.max(0, stage - 1));
          
          return newProgress >= 95 ? 95 : newProgress;
        });
      }, 500);

      return () => clearInterval(interval);
    } else {
      setProgress(100);
      setCurrentStage(ANALYSIS_STAGES.length - 1);
    }
  }, [isLoading]);

  // Show loading state
  if (isLoading) {
    return <AnalysisLoadingSkeleton currentStage={currentStage} progress={progress} />;
  }

  // Show error state
  if (error) {
    return (
      <Paper elevation={0} sx={{ p: 3, backgroundColor: '#fcfcfc', borderRadius: 2, border: '1px solid #e8e8ed' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <ErrorIcon sx={{ color: '#ff3b30', mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#1d1d1f' }}>
            Analysis Error
          </Typography>
        </Box>

        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          <Typography variant="body2">
            {error}
          </Typography>
        </Alert>

        <Button
          variant="contained"
          startIcon={<Refresh />}
          onClick={onStartAnalysis}
          sx={{
            backgroundColor: '#007aff',
            '&:hover': { backgroundColor: '#006ee6' },
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 500
          }}
        >
          Retry Analysis
        </Button>
      </Paper>
    );
  }

  // Show analysis results
  if (analysis) {
    return (
      <AnalysisResult
        analysis={analysis}
        onExport={onExportReport}
        onRegenerate={onRegenerateAnalysis}
        isLoading={false}
      />
    );
  }

  // Show ready to analyze state
  return (
    <Paper elevation={0} sx={{ p: 3, backgroundColor: '#fcfcfc', borderRadius: 2, border: '1px solid #e8e8ed' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Assessment sx={{ color: '#007aff', mr: 1 }} />
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1d1d1f' }}>
          Ready for Analysis
        </Typography>
      </Box>

      <Typography variant="body2" sx={{ color: '#6e6e73', mb: 3 }}>
        All information has been collected. Click the button below to start your security assessment.
      </Typography>

      <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
        <Typography variant="body2">
          The AI analysis will process your uploaded files and site information to generate a comprehensive security assessment report.
        </Typography>
      </Alert>

      <Button
        variant="contained"
        size="large"
        startIcon={<Assessment />}
        onClick={onStartAnalysis}
        disabled={files.length === 0}
        sx={{
          backgroundColor: '#007aff',
          '&:hover': { backgroundColor: '#006ee6' },
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 500,
          px: 4,
          py: 1.5
        }}
      >
        Start Security Analysis
      </Button>
    </Paper>
  );
}

export default AnalysisStep;