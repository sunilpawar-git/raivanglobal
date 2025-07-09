import React from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Grid,
  Alert
} from '@mui/material';
import { LocationOn, Business, Landscape } from '@mui/icons-material';

function SiteInfoStep({ 
  siteName, 
  setSiteName,
  facilityType,
  setFacilityType,
  locationEnvironment,
  setLocationEnvironment,
  initialObservations,
  setInitialObservations,
  specificConcerns,
  setSpecificConcerns,
  errors 
}) {
  const facilityTypes = [
    'Commercial Office',
    'Industrial Plant',
    'Retail Store',
    'Residential Complex',
    'Data Center',
    'Healthcare Facility',
    'Educational Institution',
    'Government Building',
    'Transportation Hub',
    'Warehouse/Logistics',
    'Other'
  ];

  const environments = [
    'Urban',
    'Rural',
    'Suburban',
    'Remote',
    'Coastal',
    'Mountainous',
    'Industrial Zone',
    'Commercial District',
    'Residential Area',
    'Other'
  ];

  return (
    <Paper elevation={0} sx={{ p: 3, backgroundColor: '#fcfcfc', borderRadius: 2, border: '1px solid #e8e8ed' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <LocationOn sx={{ color: '#007aff', mr: 1 }} />
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1d1d1f' }}>
          Site Information
        </Typography>
      </Box>
      
      <Typography variant="body2" sx={{ color: '#6e6e73', mb: 3 }}>
        Provide details about your location to help us understand the security context and requirements.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Site Name"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            placeholder="e.g., Main Office Building, Warehouse A"
            error={!!errors?.siteName}
            helperText={errors?.siteName}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: '#ffffff',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#007aff'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#007aff'
                }
              }
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth error={!!errors?.facilityType}>
            <InputLabel>Facility Type</InputLabel>
            <Select
              value={facilityType}
              onChange={(e) => setFacilityType(e.target.value)}
              label="Facility Type"
              sx={{
                borderRadius: 2,
                backgroundColor: '#ffffff',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#007aff'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#007aff'
                }
              }}
            >
              <MenuItem value="">Select Facility Type</MenuItem>
              {facilityTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Business sx={{ mr: 1, fontSize: '1rem', color: '#6e6e73' }} />
                    {type}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth error={!!errors?.locationEnvironment}>
            <InputLabel>Location Environment</InputLabel>
            <Select
              value={locationEnvironment}
              onChange={(e) => setLocationEnvironment(e.target.value)}
              label="Location Environment"
              sx={{
                borderRadius: 2,
                backgroundColor: '#ffffff',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#007aff'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#007aff'
                }
              }}
            >
              <MenuItem value="">Select Environment</MenuItem>
              {environments.map((env) => (
                <MenuItem key={env} value={env}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Landscape sx={{ mr: 1, fontSize: '1rem', color: '#6e6e73' }} />
                    {env}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Initial Observations"
            value={initialObservations}
            onChange={(e) => setInitialObservations(e.target.value)}
            placeholder="e.g., Appears well-maintained, some overgrown foliage, visible security cameras"
            error={!!errors?.initialObservations}
            helperText={errors?.initialObservations || "Describe what you observe about the current security state"}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: '#ffffff',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#007aff'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#007aff'
                }
              }
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Specific Concerns (Optional)"
            value={specificConcerns}
            onChange={(e) => setSpecificConcerns(e.target.value)}
            placeholder="e.g., Broken gate on west side, unlit back entrance, suspicious loitering"
            error={!!errors?.specificConcerns}
            helperText={errors?.specificConcerns || "Any specific security concerns or vulnerabilities you've noticed"}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: '#ffffff',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#007aff'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#007aff'
                }
              }
            }}
          />
        </Grid>
      </Grid>

      <Alert severity="info" sx={{ mt: 3, borderRadius: 2 }}>
        <Typography variant="body2">
          <strong>Tip:</strong> Provide as much detail as possible for a more accurate security assessment.
        </Typography>
      </Alert>
    </Paper>
  );
}

export default SiteInfoStep;