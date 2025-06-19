// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#A8D5BA', // Mint green
      contrastText: '#2E2E2E',
    },
    secondary: {
      main: '#CBAACB', // Lavender
      contrastText: '#2E2E2E',
    },
    background: {
      default: '#F6FFF8', // Light mint background
      paper: 'rgba(255, 255, 255, 0.8)', // Card-like backgrounds
    },
    text: {
      primary: '#2E2E2E',
    },
  },
  typography: {
    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#94C9AD', // Darker mint for hover
          },
        },
      },
    },
  },
});

export default theme;
