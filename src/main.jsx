import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#A8D5BA' // Mint green
    },
    background: {
      default: '#F6FFF8',     // Light mint background
      paper: '#FFFFFF'        // Card/dialog background
    },
    text: {
      primary: '#2E2E2E'
    }
  },
  typography: {
    fontFamily: 'Avenir, Helvetica, Arial, sans-serif'
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
