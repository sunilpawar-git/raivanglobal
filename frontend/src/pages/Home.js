import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Typography, Grid, Card, useTheme, Stack, Fade, Slide } from '@mui/material';
import { Link } from 'react-router-dom';
import SecurityIcon from '@mui/icons-material/Security';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CodeIcon from '@mui/icons-material/Code';
import ShieldIcon from '@mui/icons-material/Shield';
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
          position: 'relative',
          background: `linear-gradient(135deg, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.6)), url(${HeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed', // Parallax effect
          color: 'white',
          py: { xs: 10, md: 16 },
          overflow: 'hidden',
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Animated background elements */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          opacity: 0.2,
          overflow: 'hidden',
        }}>
          {[...Array(5)].map((_, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                width: { xs: '100px', md: '150px' },
                height: { xs: '100px', md: '150px' },
                borderRadius: '50%',
                background: theme.palette.primary.main,
                filter: 'blur(50px)',
                opacity: 0.4,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: 'translate(-50%, -50%)',
                animation: `float ${5 + i * 2}s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </Box>

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Fade in={true} timeout={1000}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ShieldIcon sx={{ fontSize: 32, color: theme.palette.secondary.main, mr: 1 }} />
                    <Typography variant="overline" sx={{ letterSpacing: 2, fontWeight: 600, color: theme.palette.secondary.main }}>
                      RAIVAN GLOBAL SECURITY
                    </Typography>
                  </Box>
                  
                  <Typography 
                    variant="h1" 
                    component="h1" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 800,
                      fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                      lineHeight: 1.1,
                      mb: 3,
                      background: 'linear-gradient(90deg, #ffffff 0%, #e0e0e0 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Next-Gen Security for Your Digital Assets
                  </Typography>
                  
                  <Typography 
                    variant="h5" 
                    component="p" 
                    sx={{ 
                      mb: 4, 
                      opacity: 0.9,
                      maxWidth: '600px',
                      lineHeight: 1.6,
                      fontSize: { xs: '1rem', md: '1.25rem' },
                    }}
                  >
                    Protect your business with AI-powered security audits that identify vulnerabilities before attackers do. Stay one step ahead in the cybersecurity arms race.
                  </Typography>
                  
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      component={Link}
                      to="/analyze"
                      sx={{ 
                        px: 4, 
                        py: 2, 
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderRadius: '30px',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
                        },
                        transition: 'all 0.3s',
                      }}
                    >
                      Analyze Your Model
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="large"
                      component={Link}
                      to="/contact"
                      sx={{ 
                        px: 4, 
                        py: 2, 
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderRadius: '30px',
                        borderWidth: '2px',
                        '&:hover': {
                          borderWidth: '2px',
                          backgroundColor: 'rgba(255,255,255,0.05)',
                        },
                      }}
                    >
                      Get a Free Consultation
                    </Button>
                  </Stack>
                  
                  <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                    {['SOC 2 Certified', '24/7 Support', '99.9% Accuracy'].map((item, index) => (
                      <Slide direction="up" in={true} timeout={500 + (index * 200)} key={index}>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          backdropFilter: 'blur(10px)',
                          borderRadius: '20px',
                          px: 2,
                          py: 1,
                        }}>
                          <Box 
                            sx={{ 
                              width: 8, 
                              height: 8, 
                              borderRadius: '50%', 
                              backgroundColor: theme.palette.secondary.main,
                              mr: 1 
                            }} 
                          />
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {item}
                          </Typography>
                        </Box>
                      </Slide>
                    ))}
                  </Box>
                </Box>
              </Fade>
            </Grid>
            
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Fade in={true} timeout={1500}>
                <Box
                  sx={{
                    position: 'relative',
                    height: '500px',
                    width: '100%',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(0,0,0,0.2)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {/* This would be a good place for a 3D model, animation, or interactive element */}
                  <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    height: '80%',
                    background: `radial-gradient(circle, ${theme.palette.secondary.main} 0%, rgba(0,0,0,0) 70%)`,
                    opacity: 0.6,
                    filter: 'blur(40px)',
                    animation: 'pulse 4s infinite',
                  }} />
                  
                  {/* Placeholder for a security visualization or dashboard */}
                  <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                  }}>
                    <SecurityIcon sx={{ fontSize: 100, color: theme.palette.secondary.main, opacity: 0.9 }} />
                    <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
                      Advanced Security Analytics
                    </Typography>
                  </Box>
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </Container>
        
        {/* Add a subtle scroll indicator */}
        <Box 
          sx={{
            position: 'absolute',
            bottom: 30,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: 0.7,
            animation: 'bounce 2s infinite',
          }}
        >
          <Typography variant="caption" sx={{ mb: 1 }}>Scroll to explore</Typography>
          <Box sx={{ 
            width: 30, 
            height: 50, 
            border: '2px solid white', 
            borderRadius: 15,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 6,
              height: 6,
              backgroundColor: 'white',
              borderRadius: '50%',
              animation: 'scrollDown 2s infinite',
            }
          }} />
        </Box>
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
