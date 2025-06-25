import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button, Accordion, AccordionSummary, AccordionDetails, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SecurityIcon from '@mui/icons-material/Security';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CodeIcon from '@mui/icons-material/Code';
import CloudIcon from '@mui/icons-material/Cloud';
import LockIcon from '@mui/icons-material/Lock';
import DevicesIcon from '@mui/icons-material/Devices';
import ServiceHero from '../assets/service-hero.jpg';

const services = [
  {
    icon: <SecurityIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
    title: 'Penetration Testing',
    description: 'Simulated cyber attacks to identify vulnerabilities in your systems before malicious actors can exploit them.',
    details: [
      'Web Application Penetration Testing',
      'Network Penetration Testing',
      'Mobile Application Security Testing',
      'Wireless Network Security Assessment',
      'Social Engineering Testing'
    ]
  },
  {
    icon: <AssessmentIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
    title: 'Security Assessment',
    description: 'Comprehensive evaluation of your security posture to identify and mitigate potential risks.',
    details: [
      'Vulnerability Assessment',
      'Risk Assessment & Management',
      'Security Architecture Review',
      'Compliance Assessment',
      'Cloud Security Assessment'
    ]
  },
  {
    icon: <CodeIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
    title: 'Secure Code Review',
    description: 'In-depth analysis of your source code to identify security vulnerabilities and recommend fixes.',
    details: [
      'Static Application Security Testing (SAST)',
      'Manual Code Review',
      'Secure Coding Best Practices',
      'Dependency Vulnerability Scanning',
      'Remediation Guidance'
    ]
  },
  {
    icon: <CloudIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
    title: 'Cloud Security',
    description: 'Specialized security services for cloud environments and infrastructure.',
    details: [
      'Cloud Security Architecture Review',
      'Cloud Configuration Review',
      'Container Security Assessment',
      'Serverless Security Assessment',
      'Cloud Compliance Assessment'
    ]
  },
  {
    icon: <LockIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
    title: 'Compliance & Governance',
    description: 'Ensuring your organization meets industry standards and regulatory requirements.',
    details: [
      'ISO 27001 Implementation',
      'SOC 2 Compliance',
      'GDPR Compliance',
      'HIPAA Compliance',
      'PCI DSS Compliance'
    ]
  },
  {
    icon: <DevicesIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
    title: 'IoT Security',
    description: 'Securing Internet of Things devices and their ecosystems.',
    details: [
      'Firmware Security Analysis',
      'Hardware Security Assessment',
      'IoT Protocol Security',
      'Mobile App Security',
      'Cloud API Security'
    ]
  }
];

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius + 'px !important',
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  '&:before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    margin: theme.spacing(2, 0),
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
}));

function Services() {
  const theme = useTheme();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${ServiceHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          color: 'white',
          py: 15,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Our Security Services
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9 }}>
            Comprehensive security solutions tailored to protect your business from evolving cyber threats
          </Typography>
        </Container>
      </Box>

      {/* All Services */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6, fontWeight: 600 }}>
          Security Services Overview
        </Typography>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <StyledCard elevation={3}>
                <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    {service.icon}
                  </Box>
                  <Typography variant="h5" component="h3" align="center" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                    {service.title}
                  </Typography>
                  <Typography align="center" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
                    {service.description}
                  </Typography>
                  <Box sx={{ mt: 'auto' }}>
                    <StyledAccordion elevation={0}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                        sx={{ px: 0, '&:hover': { backgroundColor: 'transparent' } }}
                      >
                        <Typography sx={{ fontWeight: 600 }}>View Details</Typography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ px: 0, pt: 0 }}>
                        <ul style={{ paddingLeft: '24px', margin: 0 }}>
                          {service.details.map((item, i) => (
                            <li key={i} style={{ marginBottom: '8px' }}>
                              <Typography>{item}</Typography>
                            </li>
                          ))}
                        </ul>
                      </AccordionDetails>
                    </StyledAccordion>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Process Section */}
      <Box sx={{ backgroundColor: theme.palette.background.default, py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6, fontWeight: 600 }}>
            Our Security Assessment Process
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                step: '01',
                title: 'Discovery',
                description: 'We begin by understanding your business, systems, and security requirements.'
              },
              {
                step: '02',
                title: 'Planning',
                description: 'Our team develops a customized assessment plan tailored to your needs.'
              },
              {
                step: '03',
                title: 'Assessment',
                description: 'We conduct thorough security testing using both automated tools and manual techniques.'
              },
              {
                step: '04',
                title: 'Analysis',
                description: 'Our experts analyze findings and validate all identified vulnerabilities.'
              },
              {
                step: '05',
                title: 'Reporting',
                description: 'You receive a detailed report with risk ratings and remediation recommendations.'
              },
              {
                step: '06',
                title: 'Remediation Support',
                description: 'We provide guidance and support to help you address the identified issues.'
              }
            ].map((item, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Box sx={{ 
                  backgroundColor: 'white', 
                  p: 4, 
                  borderRadius: 2, 
                  height: '100%',
                  borderLeft: `4px solid ${theme.palette.primary.main}`,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme.shadows[4],
                  },
                }}>
                  <Typography variant="h2" component="div" color="primary" sx={{ 
                    fontSize: '2.5rem', 
                    fontWeight: 700, 
                    mb: 2,
                    lineHeight: 1
                  }}>
                    {item.step}
                  </Typography>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                    {item.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {item.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ 
        backgroundColor: theme.palette.primary.main, 
        color: 'white', 
        py: 8,
        textAlign: 'center'
      }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
            Ready to Secure Your Business?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Contact us today to discuss your security needs and get a free consultation.
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            size="large"
            href="/contact"
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
            Get in Touch
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

export default Services;
