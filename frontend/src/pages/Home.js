import React from 'react';
import { Box, Container, Grid, Card, Typography, Button, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import SecurityIcon from '@mui/icons-material/Security';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CodeIcon from '@mui/icons-material/Code';
import ShieldIcon from '@mui/icons-material/Shield';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HeroSection from '../components/HeroSection';

// Import a modern illustration
import securityIllustration from '../assets/images/security-illustration.svg';

const services = [
  {
    icon: <SecurityIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
    title: 'Security Audits',
    description: 'Comprehensive security assessments to identify vulnerabilities in your infrastructure.'
  },
  {
    icon: <AssessmentIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
    title: 'Risk Assessment',
    description: 'In-depth analysis of potential risks and threats to your assests and business operations.'
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
    title: 'Threat Mitigation',
    description: 'Address security concerns with end-to-end mitigation, through tech/human level resolutions.'
  },
];

function Home() {
  const theme = useTheme();

  return (
    <Box>
      <HeroSection
        title={
          <>
            <Box sx={{ 
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: 'rgba(123, 104, 238, 0.1)',
              px: 2,
              py: 0.5,
              borderRadius: '20px',
              mb: 2
            }}>
              <ShieldIcon sx={{ fontSize: 20, color: 'primary.main', mr: 1 }} />
              <Typography 
                variant="overline" 
                sx={{ 
                  letterSpacing: 1.5, 
                  fontWeight: 600, 
                  color: 'primary.main',
                  lineHeight: 1.2
                }}
              >
                RAIVAN GLOBAL SECURITY
              </Typography>
            </Box>
            <Box sx={{ 
              background: 'linear-gradient(90deg, #1a1a2e 0%, #4a4a68 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Next-Gen Security for \n Your Assets
            </Box>
          </>
        }
        subtitle="Protect your business with AI-powered security audits that identify vulnerabilities before attackers do. Stay one step ahead in the cybersecurity arms race with our comprehensive security solutions."
        primaryButtonText="Get Started"
        primaryButtonLink="/analyze"
        secondaryButtonText="Schedule a Demo"
        secondaryButtonLink="/contact"
        features={[
          {
            title: 'Comprehensive Security Audits',
            description: 'Thorough assessments to identify and mitigate security risks',
            icon: <CheckCircleIcon color="primary" />
          },
          {
            title: '24/7 Threat Monitoring',
            description: 'Round-the-clock surveillance of your digital assets',
            icon: <CheckCircleIcon color="primary" />
          },
          {
            title: 'Compliance & Certification',
            description: 'Ensure compliance with industry standards and regulations',
            icon: <CheckCircleIcon color="primary" />
          },
          {
            title: 'Rapid Response',
            description: 'Immediate action on security incidents and breaches',
            icon: <CheckCircleIcon color="primary" />
          }
        ]}
        image={securityIllustration}
        backgroundColor="white"
        titleColor="#1a1a2e"
        subtitleColor="#4a4a68"
        buttonSx={{
          '&.MuiButton-contained': {
            background: 'linear-gradient(90deg, #7B68EE 0%, #5F4BDB 100%)',
            color: 'white',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 10px 20px rgba(123, 104, 238, 0.3)',
            },
          },
          '&.MuiButton-outlined': {
            borderColor: '#7B68EE',
            color: '#7B68EE',
            '&:hover': {
              backgroundColor: 'rgba(123, 104, 238, 0.05)',
              borderColor: '#7B68EE',
            },
          },
        }}
      />

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6, fontWeight: 600 }}>
          Our Services
        </Typography>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
              >
                <Box sx={{ p: 4, textAlign: 'center' }}>
                  {service.icon}
                  <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
                    {service.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {service.description}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Ready to Secure Your Business?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Contact us today for a free consultation and discover how we can help protect your digital assets.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={Link}
            to="/contact"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 3,
              },
              transition: 'all 0.3s',
            }}
          >
            Get Started
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
