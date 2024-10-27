"use client";

import { Typography, Box, AppBar, Toolbar, Container, IconButton, Button } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";

export default function Home() {
  const [currentView, setCurrentView] = useState('home'); 

  const renderContent = () => {
    if (currentView === 'signIn') {
      return <SignIn />;
    } else if (currentView === 'signUp') {
      return <SignUp />;
    }

    // Default home content
    return (
      <>
        <Typography variant="h1" component="h1" gutterBottom>
          Welcome to Physical Therapy
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          We help alleviate your body pain with personalized guidance and professional support.
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Learn More
        </Button>
      </>
    );
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#333', color: '#fff' }}>
      <AppBar position="static"> {/* Adjusted position to static for simplicity */}
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            {/* Add icon here if needed */}
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" color="inherit">
              Physical Therapy
            </Typography>
          </Box>
          <Button color="inherit" onClick={() => setCurrentView('signUp')}>
            Sign Up
          </Button>
          <Button color="inherit" onClick={() => setCurrentView('signIn')}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          textAlign: 'center',
          padding: '2rem',
          paddingTop: '64px',
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        {renderContent()}
      </Container>
    </Box>
  );
}
