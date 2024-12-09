import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './utils/theme';

import store from "./redux/Store";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>

      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
          <CssBaseline />
        </ThemeProvider>
      </Provider>

    </BrowserRouter>
  </React.StrictMode>
);
