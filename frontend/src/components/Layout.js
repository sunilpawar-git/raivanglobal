import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e', // Dark blue
    },
    secondary: {
      main: '#ff6d00', // Orange
    },
    background: {
      default: '#f5f7fa',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
  },
});

function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="static" elevation={0}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: 'flex',
                  fontWeight: 700,
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                RAI<span style={{ color: '#ff6d00' }}>VAN</span> GLOBAL
              </Typography>
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <Typography
                  variant="body2"
                  component="a"
                  href="/services"
                  sx={{
                    my: 2,
                    mx: 2,
                    color: 'white',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Services
                </Typography>
                <Typography
                  variant="body2"
                  component="a"
                  href="/about"
                  sx={{
                    my: 2,
                    mx: 2,
                    color: 'white',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  About Us
                </Typography>
                <Typography
                  variant="body2"
                  component="a"
                  href="/contact"
                  sx={{
                    my: 2,
                    mx: 2,
                    color: 'white',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Contact
                </Typography>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Box component="main" sx={{ flexGrow: 1 }}>
          {children}
        </Box>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="xl">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} Raivan Global. All rights reserved.
              </Typography>
              <Box>
                <Typography
                  variant="body2"
                  component="a"
                  href="/privacy"
                  sx={{
                    mx: 2,
                    color: 'text.secondary',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Privacy Policy
                </Typography>
                <Typography
                  variant="body2"
                  component="a"
                  href="/terms"
                  sx={{
                    mx: 2,
                    color: 'text.secondary',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Terms of Service
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Layout;
