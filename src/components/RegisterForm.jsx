import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Добавяме роля, по подразбиране е student
  const navigate = useNavigate();

  const handleRegister = async () => {
    // Проверка дали името на потребителя е празно
    if (!username || !password) return alert('Моля, попълнете всички полета!');

    const hashedPassword = await import('bcryptjs').then(bcrypt => bcrypt.hashSync(password, 10));
    const user = { username: username.toLowerCase(), password: hashedPassword, role };

    // Получаваме текущите потребители от localStorage или инициализираме празен масив
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Проверка дали потребителят вече съществува
    if (users.some(u => u.username === user.username)) {
      return alert('Потребител с това име вече съществува!');
    }

    // Добавяме новия потребител
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Регистрацията беше успешна!');

    // Навигираме към страницата за вход
    navigate('/');
  };

  return (
    <div>
      <h2>Регистрация</h2>
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
      
      {/* Добавяме избор на роля */}
      <FormControl fullWidth>
        <InputLabel>Роля</InputLabel>
        <Select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <MenuItem value="student">Ученик</MenuItem>
          <MenuItem value="teacher">Учител</MenuItem>
        </Select>
      </FormControl>

      <Button onClick={handleRegister} variant="contained" fullWidth>
        Регистрирай се
      </Button>
    </div>
  );
};

export default RegisterForm;
