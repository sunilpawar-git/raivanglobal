import React from 'react';
import { Box, Container, Typography, Grid, Paper, Avatar, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import SecurityIcon from '@mui/icons-material/Security';
import GroupIcon from '@mui/icons-material/Group';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import TeamImage from '../assets/team.jpg'; // Add appropriate image

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  height: '100%',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

const team = [
  {
    name: 'Alex Johnson',
    role: 'Chief Security Officer',
    bio: '15+ years in cybersecurity, specializing in penetration testing and ethical hacking.',
    avatar: 'AJ',
  },
  {
    name: 'Sarah Williams',
    role: 'Lead Security Analyst',
    bio: 'Expert in security architecture and risk management with a focus on enterprise solutions.',
    avatar: 'SW',
  },
  {
    name: 'Michael Chen',
    role: 'Senior Security Engineer',
    bio: 'Specializes in application security and secure coding practices.',
    avatar: 'MC',
  },
];

const stats = [
  { value: '200+', label: 'Projects Completed' },
  { value: '50+', label: 'Happy Clients' },
  { value: '15+', label: 'Years Experience' },
  { value: '100%', label: 'Client Satisfaction' },
];

function About() {
  const theme = useTheme();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          py: 12,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            About Raivan Global
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9, maxWidth: '800px', mx: 'auto' }}>
            Leading the way in cybersecurity solutions with innovation, expertise, and unwavering commitment to our clients' security.
          </Typography>
        </Container>
      </Box>

      {/* Our Story */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
              Our Story
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 3 }}>
              Founded in 2010, Raivan Global has grown from a small team of security enthusiasts to a trusted name in the cybersecurity industry. 
              Our journey began with a simple mission: to make the digital world a safer place for businesses of all sizes.
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 3 }}>
              Today, we're proud to serve clients across various industries, providing cutting-edge security solutions tailored to their unique needs. 
              Our team of certified professionals brings together decades of combined experience in cybersecurity, risk management, and compliance.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={TeamImage}
              alt="Our Team"
              sx={{
                width: '100%',
                borderRadius: 4,
                boxShadow: 6,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Our Values */}
      <Box sx={{ backgroundColor: theme.palette.background.default, py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6, fontWeight: 600 }}>
            Our Values
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <StyledPaper elevation={3}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                  <SecurityIcon sx={{ fontSize: 50, color: 'primary.main' }} />
                </Box>
                <Typography variant="h5" component="h3" align="center" gutterBottom sx={{ fontWeight: 600 }}>
                  Security First
                </Typography>
                <Typography align="center" color="text.secondary">
                  We prioritize the security and privacy of our clients above all else, implementing the most robust protection measures available.
                </Typography>
              </StyledPaper>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledPaper elevation={3}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                  <GroupIcon sx={{ fontSize: 50, color: 'primary.main' }} />
                </Box>
                <Typography variant="h5" component="h3" align="center" gutterBottom sx={{ fontWeight: 600 }}>
                  Client-Centric
                </Typography>
                <Typography align="center" color="text.secondary">
                  Our clients are at the heart of everything we do. We listen, understand, and deliver solutions that exceed expectations.
                </Typography>
              </StyledPaper>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledPaper elevation={3}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                  <EmojiObjectsIcon sx={{ fontSize: 50, color: 'primary.main' }} />
                </Box>
                <Typography variant="h5" component="h3" align="center" gutterBottom sx={{ fontWeight: 600 }}>
                  Innovative Solutions
                </Typography>
                <Typography align="center" color="text.secondary">
                  We stay ahead of emerging threats by continuously innovating and adapting our security solutions to the evolving digital landscape.
                </Typography>
              </StyledPaper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Our Team */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6, fontWeight: 600 }}>
          Meet Our Leadership
        </Typography>
        <Grid container spacing={4}>
          {team.map((member, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{
                    width: 150,
                    height: 150,
                    mx: 'auto',
                    mb: 3,
                    bgcolor: 'primary.main',
                    fontSize: '3rem',
                    fontWeight: 600,
                  }}
                >
                  {member.avatar}
                </Avatar>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  {member.name}
                </Typography>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  {member.role}
                </Typography>
                <Typography color="text.secondary">
                  {member.bio}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Stats */}
      <Box sx={{ backgroundColor: theme.palette.primary.main, color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid item xs={6} sm={3} key={index} sx={{ textAlign: 'center' }}>
                <Typography variant="h2" component="div" sx={{ fontWeight: 700, mb: 1 }}>
                  {stat.value}
                </Typography>
                <Typography variant="h6">{stat.label}</Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default About;
