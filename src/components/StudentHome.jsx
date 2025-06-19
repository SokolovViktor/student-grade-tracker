import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography, Paper, Box } from '@mui/material';

const StudentHome = () => {
  const [subjectsList, setSubjectsList] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    if (user.username) setUserName(user.username);
    const storedSubjects = JSON.parse(localStorage.getItem('subjects')) || [];
    setSubjectsList(storedSubjects);
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Добре дошъл, {userName}!</Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>Вашите оценки са:</Typography>
      {subjectsList.length === 0 ? (
        <Typography>Няма налични предмети.</Typography>
      ) : (
        subjectsList.map((item, index) => (
          <Paper key={index} sx={{ p: 2, mb: 2, backgroundColor: 'background.paper' }}>
            <Typography variant="subtitle1">{item.subject}</Typography>
            <Typography><strong>Оценки:</strong> {item.grades.length > 0 ? item.grades.join(', ') : 'Няма оценка'}</Typography>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default StudentHome;
