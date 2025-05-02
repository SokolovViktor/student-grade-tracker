import { Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const subjects = ['English', 'Math', 'JavaScript', 'React', 'Science', 'Data Structures'];
const grades = [6, 5, 4, 5, 6, 6];

const StudentHome = () => {
  return (
    <Paper elevation={3} sx={{ padding: 3, margin: 3 }}>
      <Typography variant="h5" gutterBottom>My Grades</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {subjects.map(subject => (
                <TableCell key={subject}>{subject}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {grades.map((grade, i) => (
                <TableCell key={i}>{grade}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default StudentHome;