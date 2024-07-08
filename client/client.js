import React from 'react'; 
import App from './App'
import { createRoot } from 'react-dom/client';
require('dotenv').config();

const root = createRoot(document.getElementById('root'));
root.render (
  <App/>
);