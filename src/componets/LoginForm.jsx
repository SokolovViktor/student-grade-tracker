import { TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch(`http://localhost:5000/users?username=${username}`);
    const data = await res.json();

    if (data.length === 0) return alert('User not found');

    const bcrypt = await import('bcryptjs');
    const valid = bcrypt.compareSync(password, data[0].password);

    if (!valid) return alert('Invalid password');

    localStorage.setItem('user', JSON.stringify(data[0]));
    navigate('/dashboard');
  };

  return (
    <div>
      <TextField label="Username" fullWidth onChange={e => setUsername(e.target.value)} />
      <TextField label="Password" type="password" fullWidth onChange={e => setPassword(e.target.value)} />
      <Button variant="contained" onClick={handleLogin}>Login</Button>
      <Button variant="text" onClick={() => navigate('/register')}>Register</Button>
    </div>
  );
};

export default LoginForm;
