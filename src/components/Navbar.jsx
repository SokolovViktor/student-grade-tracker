import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
          Student Tracker
        </Typography>
        <Button color="inherit" onClick={() => navigate('/')}>Login</Button>
        <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
