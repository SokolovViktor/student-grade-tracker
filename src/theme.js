import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#A8D5BA', // Mint green
      contrastText: '#ffffff', // For buttons on AppBar
    },
    background: {
      default: '#F6FFF8',    // Soft mint background
      paper: '#ffffff',      // For cards, dialogs
    },
    text: {
      primary: '#2E2E2E',    // Dark text for light backgrounds
    },
  },
  typography: {
    fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
  },
});

export default theme;
