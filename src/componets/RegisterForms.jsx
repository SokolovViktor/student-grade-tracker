import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [role, setRole] = useState('student');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    teacherId: ''
  });
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch teachers list if user selects student role
    if (role === 'student') {
      fetch('http://localhost:5000/teachers')
        .then(res => res.json())
        .then(setTeachers);
    }
  }, [role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.username || !formData.password || !formData.firstName || !formData.lastName) {
      return alert('Please fill all required fields');
    }
    
    if (formData.password !== formData.confirmPassword) {
      return alert('Passwords do not match');
    }

    // Check if username exists
    const userCheck = await fetch(`http://localhost:5000/users?username=${formData.username}`);
    const userExists = await userCheck.json();
    
    if (userExists.length > 0) {
      return alert('Username already exists');
    }

    // Create new user
    const bcrypt = await import('bcryptjs');
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(formData.password, salt);

    const newUser = {
      username: formData.username,
      password: hashedPassword,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: role
    };

    // Add teacherId if role is student
    if (role === 'student' && formData.teacherId) {
      newUser.teacherId = formData.teacherId;
    }

    // Save user to database
    await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem' }}>
      <h2>Register</h2>
      
      <FormControl fullWidth margin="normal">
        <InputLabel>Role</InputLabel>
        <Select
          value={role}
          label="Role"
          onChange={(e) => setRole(e.target.value)}
        >
          <MenuItem value="student">Student</MenuItem>
          <MenuItem value="teacher">Teacher</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      
      <TextField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      
      <TextField
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      
      <TextField
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      
      {role === 'student' && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Teacher</InputLabel>
          <Select
            value={formData.teacherId}
            name="teacherId"
            label="Teacher"
            onChange={handleChange}
          >
            {teachers.map(teacher => (
              <MenuItem key={teacher.id} value={teacher.id}>
                {teacher.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      
      <Button
        variant="contained"
        onClick={handleSubmit}
        fullWidth
        sx={{ mt: 3 }}
      >
        Register
      </Button>
      
      <Button
        variant="text"
        onClick={() => navigate('/login')}
        fullWidth
        sx={{ mt: 1 }}
      >
        Already have an account? Login
      </Button>
    </div>
  );
};

export default RegisterForm;