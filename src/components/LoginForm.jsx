import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
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

    // Записваме потребителя в localStorage
    localStorage.setItem('user', JSON.stringify(user));

    // Пренасочваме към съответния портал
    if (user.role === 'teacher') {
      navigate('/teacher-home');
    } else {
      navigate('/student-home');
    }
  };

  return (
    <div>
      <h2>Вход</h2>
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
      <Button onClick={handleLogin} variant="contained" fullWidth>
        Влез
      </Button>
    </div>
  );
};

export default LoginForm;
