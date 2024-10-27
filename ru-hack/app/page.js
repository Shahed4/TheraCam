"use client";

import { Typography, Box, AppBar, Toolbar, Container, IconButton, Button } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import SignIn from "./Components/sign-in";
import SignUp from "./Components/sign-up";

export default function Home() {
  const [currentView, setCurrentView] = useState('home'); 

  const renderContent = () => {
    if (currentView === 'signIn') {
      return <SignIn />;
    } else if (currentView === 'signUp') {
      return <SignUp />;
    }

// Default home content
// Default home content
// Default home content
return (
  <>
    <Box sx={{ textAlign: 'center', p: 3 }}>
      <Typography
        variant="h1"
        component="h1"
        gutterBottom
        sx={{
          margin: '10px auto',
          fontSize: '5rem',
          padding: '4px 8px',
          border: '2px solid black',
          textAlign: 'center',
          backgroundColor: 'white',
          color: 'black',  // Ensures the text color contrasts with the white background
          display: 'inline-block',
          borderRadius: '10px',
          marginBottom: '10px'
        }}
      >
        Welcome to <strong>TheraCam</strong> 
      </Typography>

      <Typography variant="h5" sx={{ color: 'grey' }} component="h2" gutterBottom>
      We help alleviate your body pain with personalized guidance, professional support, and tools designed to improve your well-being and restore your mobility.
      </Typography>

      <Box 
        component="img"
        src="/assets/images/main.png"
        alt="Standing Shoulder Rotation Exercise"
        sx={{
          width: '100%',
          maxWidth: 600,
          height: 'auto',
          mt: 4,
          mb: 2,
          borderRadius: 2,
          boxShadow: 3,
          mx: 'auto',  // Centers the image horizontally
          display: 'block',
        }}
      />

      <Button variant="contained" color="primary" sx={{ mt: 4, display: 'block', mx: 'auto' }}>
        Learn More
      </Button>
    </Box>
  </>
);


  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'lightBlue', color: '#fff' }}>
      <AppBar position="static"> {/* Adjusted position to static for simplicity */}
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2}}>
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