import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Box, Stack, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username.toLowerCase());
    if (!user) return alert('Потребител не е намерен!');

    const bcrypt = await import('bcryptjs');
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return alert('Невалидна парола!');

    localStorage.setItem('user', JSON.stringify(user));
    navigate(user.role === 'teacher' ? '/teacher-home' : '/student-home');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Вход
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Потребителско име"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />
          <TextField
            label="Парола"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <Button
            onClick={handleLogin}
            variant="contained"
            color="primary"
            fullWidth
          >
            Влез
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default LoginForm;
