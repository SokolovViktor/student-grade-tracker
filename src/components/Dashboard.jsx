import { TextField, Button, Paper, Typography, Container, Stack } from '@mui/material';
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
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }} elevation={3}>
        <Typography variant="h5" align="center" gutterBottom>
          Add Student
        </Typography>
        <form onSubmit={handleAddStudent}>
          <Stack spacing={2}>
            <TextField
              label="Student Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="Grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Add Student
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default Dashboard;
