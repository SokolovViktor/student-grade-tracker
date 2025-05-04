import { TextField, Button, Box } from '@mui/material';
import { useState } from 'react';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');

  const handleAddStudent = async (e) => {
    e.preventDefault();

    await fetch('http://localhost:5000/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, grade }),
    });

    alert('Student added!');
    setName('');
    setGrade('');
  };

  return (
    <Box component="form" onSubmit={handleAddStudent} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, mx: 'auto', mt: 10 }}>
      <TextField label="Student Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <TextField label="Grade" value={grade} onChange={(e) => setGrade(e.target.value)} required />
      <Button type="submit" variant="contained">Add Student</Button>
    </Box>
  );
};

export default Dashboard;
