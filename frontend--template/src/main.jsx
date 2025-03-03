import { StrictMode } from 'react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Your global styles
import App from './App'; // Main App component

// Importing Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Bootstrap JS bundle (for interactive components like modals, tooltips)

// Importing additional CSS libraries like react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Toast notifications styling

// Rendering the App component inside the root div
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
