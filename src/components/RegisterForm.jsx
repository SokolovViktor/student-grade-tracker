import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Box, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const bcrypt = await import('bcryptjs');
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { username: username.toLowerCase(), password: hashedPassword, role };

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.username === newUser.username)) return alert('Потребителското име вече съществува!');

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Регистрацията е успешна!');
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
      <Paper sx={{ p: 4, maxWidth: 400, width: '100%' }} elevation={3}>
        <Typography variant="h5" sx={{ mb: 2 }}>Регистрация</Typography>
        <TextField label="Потребителско име" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth margin="normal" />
        <TextField label="Парола" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth margin="normal" />
        <TextField select label="Роля" value={role} onChange={(e) => setRole(e.target.value)} fullWidth margin="normal">
          <MenuItem value="student">Ученик</MenuItem>
          <MenuItem value="teacher">Учител</MenuItem>
        </TextField>
        <Button onClick={handleRegister} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Регистрирай се</Button>
      </Paper>
    </Box>
  );
};

export default RegisterForm;