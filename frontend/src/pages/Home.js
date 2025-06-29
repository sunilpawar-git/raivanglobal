import React from 'react';
import { Box, Button, Container, Typography, Grid, Card, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import SecurityIcon from '@mui/icons-material/Security';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CodeIcon from '@mui/icons-material/Code';
import HeroImage from '../assets/hero-bg.jpg'; // You'll need to add this image

const services = [
  {
    icon: <SecurityIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
    title: 'Security Audits',
    description: 'Comprehensive security assessments to identify vulnerabilities in your applications and infrastructure.'
  },
  {
    icon: <AssessmentIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
    title: 'Risk Assessment',
    description: 'In-depth analysis of potential risks and threats to your digital assets and business operations.'
  },
  {
    icon: <CodeIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
    title: 'Code Review',
    description: 'Thorough examination of your source code to identify security flaws and improve code quality.'
  },
];

function Home() {
  const theme = useTheme();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${HeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: 15,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Securing Your Digital Future
          </Typography>
          <Typography variant="h5" component="p" sx={{ mb: 4, opacity: 0.9 }}>
            Professional security audit services to protect your business from evolving cyber threats
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={Link}
            to="/analyze"
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
            Analyze Your Model
          </Button>
        </Container>
      </Box>

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
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
