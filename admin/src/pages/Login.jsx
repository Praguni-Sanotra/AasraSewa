// src/pages/Login.jsx
import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  useMediaQuery,
  useTheme,
  Fade,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '../styles/Login.css';
import logo from '../assets/logo.jpg'; // ✅ import the logo

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@aasrasewa.com' && password === 'admin123') {
      localStorage.setItem('isLoggedIn', 'true'); // ✅ persist login
      onLogin(); // notify App
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" className="admin-container">
      <Box className="admin-box">
        {/* ✅ Logo */}
        <img src={logo} alt="AasraSewa Logo" className="admin-logo" />

        <Typography variant={isMobile ? 'h5' : 'h4'} className="admin-title">
          AasraSewa Admin Login
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            margin="normal"
            label="Admin Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="admin-input"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="admin-input"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {error && (
            <Fade in={true}>
              <Typography color="error" variant="body2" className="admin-error">
                {error}
              </Typography>
            </Fade>
          )}

          <Button type="submit" fullWidth variant="contained" className="admin-button">
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AdminLogin;
