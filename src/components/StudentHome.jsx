import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const StudentHome = () => {
  const [subjectsList, setSubjectsList] = useState([]);
  const [userName, setUserName] = useState('');

  // Извличаме името на потребителя от localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    if (user.username) {
      setUserName(user.username);
    }
    
    const storedSubjects = JSON.parse(localStorage.getItem('subjects')) || [];
    setSubjectsList(storedSubjects);
  }, []);

  return (
    <div>
      <h1>Добре дошъл, {userName}!</h1> {/* Поздравяваме потребителя с неговото име */}
      <h2>Вашите оценки са:</h2>
      <List>
        {subjectsList.length === 0 ? (
          <div>Няма налични предмети.</div>
        ) : (
          subjectsList.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item.subject} />
              <div>
                <strong>Оценки:</strong>
                {item.grades.length > 0 ? item.grades.join(', ') : 'Няма оценка'}
              </div>
            </ListItem>
          ))
        )}
      </List>
    </div>
  );
};

export default StudentHome;
