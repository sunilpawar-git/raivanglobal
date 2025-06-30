import React from 'react';
import { Box, Typography, Button, Stack, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = ({
  title,
  subtitle,
  primaryButtonText = 'Get Started',
  primaryButtonLink = '/analyze',
  secondaryButtonText = 'Learn More',
  secondaryButtonLink = '/about',
  features = [],
  image,
  imagePosition = 'right',
  minHeight = '90vh',
  backgroundColor = '#f8f9ff',
  titleColor = '#1a1a2e',
  subtitleColor = '#4a4a68',
  containerSx = {},
  contentSx = {},
  titleSx = {},
  subtitleSx = {},
  buttonSx = {},
  children
}) => {


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        backgroundColor: backgroundColor,
        color: titleColor,
        py: { xs: 8, md: 12 },
        minHeight: minHeight,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        ...containerSx,
      }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(123, 104, 238, 0.06) 0%, rgba(123, 104, 238, 0) 70%)',
          zIndex: 0,
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container alignItems="center" spacing={6}>
          <Grid item xs={12} md={image ? 7 : 12}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {title && (
                <motion.div variants={itemVariants}>
                  <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                      fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                      fontWeight: 800,
                      lineHeight: 1.2,
                      mb: 3,
                      color: titleColor,
                      ...titleSx,
                    }}
                  >
                    {title}
                  </Typography>
                </motion.div>
              )}
              
              {subtitle && (
                <motion.div variants={itemVariants}>
                  <Typography
                    variant="h5"
                    component="p"
                    sx={{
                      fontSize: { xs: '1.1rem', md: '1.25rem' },
                      lineHeight: 1.7,
                      mb: 4,
                      color: subtitleColor,
                      maxWidth: '600px',
                      ...subtitleSx,
                    }}
                  >
                    {subtitle}
                  </Typography>
                </motion.div>
              )}
              
              {(primaryButtonText || secondaryButtonText) && (
                <motion.div variants={itemVariants}>
                  <Stack direction="row" spacing={2} sx={{ mb: 4, flexWrap: 'wrap', gap: 2 }}>
                    {primaryButtonText && (
                      <Button
                        component={Link}
                        to={primaryButtonLink}
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{
                          px: 4,
                          py: 1.5,
                          fontSize: '1rem',
                          fontWeight: 600,
                          borderRadius: '8px',
                          textTransform: 'none',
                          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                          },
                          transition: 'all 0.3s ease',
                          ...buttonSx,
                        }}
                      >
                        {primaryButtonText}
                      </Button>
                    )}
                    
                    {secondaryButtonText && (
                      <Button
                        component={Link}
                        to={secondaryButtonLink}
                        variant="outlined"
                        color="primary"
                        size="large"
                        sx={{
                          px: 4,
                          py: 1.5,
                          fontSize: '1rem',
                          fontWeight: 600,
                          borderRadius: '8px',
                          textTransform: 'none',
                          borderWidth: '2px',
                          '&:hover': {
                            borderWidth: '2px',
                            backgroundColor: 'rgba(123, 104, 238, 0.05)',
                          },
                          ...buttonSx,
                        }}
                      >
                        {secondaryButtonText}
                      </Button>
                    )}
                  </Stack>
                </motion.div>
              )}
              
              {features.length > 0 && (
                <motion.div variants={itemVariants}>
                  <Grid container spacing={2} sx={{ mt: 4 }}>
                    {features.map((feature, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                          <Box sx={{
                            backgroundColor: 'rgba(123, 104, 238, 0.1)',
                            borderRadius: '50%',
                            width: 32,
                            height: 32,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2,
                            flexShrink: 0,
                          }}>
                            {feature.icon || (
                              <Box sx={{ 
                                width: 6, 
                                height: 6, 
                                borderRadius: '50%', 
                                backgroundColor: 'primary.main',
                              }} />
                            )}
                          </Box>
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                              {feature.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {feature.description}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </motion.div>
              )}
            </motion.div>
          </Grid>
          
          {image && (
            <Grid item xs={12} md={5}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                    mt: { xs: 6, md: 0 },
                  }}
                >
                  {typeof image === 'string' ? (
                    <img 
                      src={image} 
                      alt="Hero" 
                      style={{ 
                        width: '100%', 
                        height: 'auto',
                        display: 'block',
                      }} 
                    />
                  ) : (
                    image
                  )}
                </Box>
              </motion.div>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
