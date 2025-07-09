import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')).render( // Render the main App component into the root element
  <React.StrictMode> // Use StrictMode to highlight potential problems in the application
    <App /> // Main application component
  </React.StrictMode> 
);
