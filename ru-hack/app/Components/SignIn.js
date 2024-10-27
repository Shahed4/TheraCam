"use client"; // Add this at the top to mark as a client component

import React, { useState, useEffect } from 'react';
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography, Stack, Divider, Link as MuiLink } from '@mui/material';
import { styled } from '@mui/material/styles';
import { GoogleIcon, FacebookIcon } from './CustomIcons';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/navigation'; // Ensure correct import
import Link from 'next/link';

const Card = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  backgroundColor: '#fff',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  maxWidth: '400px',
  width: '100%',
  margin: 'auto',
}));

export default function SignIn() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter(); // Use router for navigation

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true); // Set authenticated state if login is successful
    } catch (error) {
      setError("Login unsuccessful: " + error.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/therapy'); // Navigate to therapy page after setting authenticated state
    }
  }, [isAuthenticated, router]);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card component="form" onSubmit={handleSubmit}>
        <Typography component="h1" variant="h4" gutterBottom>
          Sign In
        </Typography>
        <TextField
          fullWidth
          id="email"
          label="Email"
          type="email"
          name="email"
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          id="password"
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          required
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button type="submit" fullWidth variant="contained">
          Sign In
        </Button>
        {error && (
          <Typography color="error" sx={{ textAlign: 'center', mt: 2 }}>
            {error}
          </Typography>
        )}
        <Typography sx={{ textAlign: 'center', mt: 2 }}>
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" passHref>
            <MuiLink variant="body2" underline="hover">
              Sign Up
            </MuiLink>
          </Link>
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="outlined" startIcon={<GoogleIcon />}>
            Google
          </Button>
          <Button variant="outlined" startIcon={<FacebookIcon />}>
            Facebook
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}
