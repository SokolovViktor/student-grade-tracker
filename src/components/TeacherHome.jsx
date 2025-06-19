import React, { useEffect, useState } from 'react';
import {
  Typography, Card, CardContent, List, ListItem, ListItemText, Button, Container,
  Stack, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Divider
} from '@mui/material';

const TeacherHome = () => {
  const [students, setStudents] = useState([]);
  const [openSubjectDialog, setOpenSubjectDialog] = useState(false);
  const [openGradeDialog, setOpenGradeDialog] = useState(false);
  const [subjectName, setSubjectName] = useState('');
  const [grade, setGrade] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const fetchStudents = async () => {
    const response = await fetch('http://localhost:5000/users');
    const data = await response.json();
    setStudents(data.filter(user => user.role === 'student'));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddSubject = () => setOpenSubjectDialog(true);

  const handleSubjectSubmit = async () => {
    if (!subjectName.trim()) return;

    const updatedStudents = students.map(student => {
      const updatedSubjects = student.subjects || [];
      if (!updatedSubjects.some(s => s.name === subjectName)) {
        updatedSubjects.push({ name: subjectName, grades: [] });
      }
      return { ...student, subjects: updatedSubjects };
    });

    await Promise.all(updatedStudents.map(async student => {
      await fetch(`http://localhost:5000/users/${student.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subjects: student.subjects })
      });
    }));

    setOpenSubjectDialog(false);
    setSubjectName('');
    fetchStudents();
  };

  const handleAddGrade = (student, subject) => {
    setSelectedStudent(student);
    setSelectedSubject(subject);
    setOpenGradeDialog(true);
  };

  const handleGradeSubmit = async () => {
    if (!grade.trim() || isNaN(grade)) return;

    const updatedStudents = students.map(student => {
      if (student.id === selectedStudent.id) {
        const updatedSubjects = student.subjects.map(subj => {
          if (subj.name === selectedSubject.name) {
            subj.grades.push(parseFloat(grade));
          }
          return subj;
        });
        return { ...student, subjects: updatedSubjects };
      }
      return student;
    });

    await Promise.all(updatedStudents.map(async student => {
      await fetch(`http://localhost:5000/users/${student.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subjects: student.subjects })
      });
    }));

    setOpenGradeDialog(false);
    setGrade('');
    fetchStudents();
  };

  return (
    <Container sx={{ py: 4, backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom>Добре дошли, Учител!</Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button variant="contained" color="primary" onClick={handleAddSubject}>Добави нов предмет</Button>
        <Button variant="outlined" color="primary" onClick={fetchStudents}>Обнови списъка</Button>
      </Stack>
      {students.map(student => (
        <Card key={student.id} variant="outlined" sx={{ mb: 3, backgroundColor: 'background.paper' }}>
          <CardContent>
            <Typography variant="h6">{student.username}</Typography>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>📚 Предмети:</Typography>
            <List dense>
              {(student.subjects || []).map(subject => (
                <ListItem key={subject.name}>
                  <ListItemText primary={subject.name} />
                  <Button variant="outlined" color="primary" onClick={() => handleAddGrade(student, subject)}>
                    Добави оценка
                  </Button>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle1">📊 Оценки:</Typography>
            <List dense>
              {(student.subjects || []).flatMap(subject =>
                (subject.grades || []).map((grade, i) => (
                  <ListItem key={`${subject.name}-grade-${i}`}>
                    <ListItemText primary={`${subject.name}: ${grade}`} />
                  </ListItem>
                ))
              )}
            </List>
          </CardContent>
        </Card>
      ))}
      <Dialog open={openSubjectDialog} onClose={() => setOpenSubjectDialog(false)}>
        <DialogTitle>Добави нов предмет</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Име на предмет" fullWidth value={subjectName} onChange={(e) => setSubjectName(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSubjectDialog(false)}>Отказ</Button>
          <Button onClick={handleSubjectSubmit} variant="contained" color="primary">Добави</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openGradeDialog} onClose={() => setOpenGradeDialog(false)}>
        <DialogTitle>Добави оценка за {selectedSubject?.name}</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Оценка" fullWidth value={grade} onChange={(e) => setGrade(e.target.value)} type="number" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenGradeDialog(false)}>Отказ</Button>
          <Button onClick={handleGradeSubmit} variant="contained" color="primary">Добави</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TeacherHome;