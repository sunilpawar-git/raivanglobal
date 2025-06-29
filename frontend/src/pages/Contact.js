import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  TextField, 
  Button, 
  Paper,
  Alert,
  Snackbar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ContactImage from '../assets/contact.jpg';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6, 4),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[4],
  [theme.breakpoints.up('md')]: {
    transform: 'translateY(-50px)',
    marginBottom: '-50px',
  },
}));

const ContactCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  transition: 'all 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

const ContactIcon = styled('div')(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.light,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
  '& svg': {
    fontSize: 40,
  },
}));

function Contact() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    
    // Show success message
    setSnackbarMessage('Your message has been sent successfully!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${ContactImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          color: 'white',
          py: 15,
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Get In Touch
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9 }}>
            We'd love to hear from you. Contact us for inquiries or to schedule a consultation.
          </Typography>
        </Container>
      </Box>

      {/* Contact Cards */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, mt: { xs: 4, md: 0 } }}>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={4}>
            <ContactCard elevation={3}>
              <ContactIcon>
                <EmailIcon />
              </ContactIcon>
              <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                Email Us
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                Have questions? Send us an email.
              </Typography>
              <Typography 
                component="a" 
                href="mailto:info@raivanglobal.com" 
                sx={{ 
                  color: 'primary.main', 
                  textDecoration: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                info@raivanglobal.com
              </Typography>
            </ContactCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <ContactCard elevation={3}>
              <ContactIcon>
                <PhoneIcon />
              </ContactIcon>
              <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                Call Us
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                Speak with our security experts.
              </Typography>
              <Typography 
                component="a" 
                href="tel:+18005551234" 
                sx={{ 
                  color: 'primary.main', 
                  textDecoration: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                +1 (800) 555-1234
              </Typography>
            </ContactCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <ContactCard elevation={3}>
              <ContactIcon>
                <LocationOnIcon />
              </ContactIcon>
              <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                Visit Us
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                Our office location.
              </Typography>
              <Typography 
                component="div"
                sx={{ 
                  color: 'text.secondary',
                  textAlign: 'center',
                }}
              >
                123 Security Lane<br />
                San Francisco, CA 94107<br />
                United States
              </Typography>
            </ContactCard>
          </Grid>
        </Grid>
      </Container>

      {/* Contact Form */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <StyledPaper>
          <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6, fontWeight: 600 }}>
            Send Us a Message
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  multiline
                  rows={6}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    px: 6,
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
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </form>
        </StyledPaper>
      </Container>

      {/* Map Section */}
      <Box sx={{ height: '500px', width: '100%', mb: -2 }}>
        <iframe
          title="Raivan Global Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.155370208116!2d-122.4024726846825!3d37.78688297975786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807f8f4af8d9%3A0x1122879c36eb5028!2s123%20Security%20Ln%2C%20San%20Francisco%2C%20CA%2094107%2C%20USA!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </Box>

      {/* Success Message */}
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Contact;
