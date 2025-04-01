import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import ShopContextProvider from './context/ShopContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(  // Use ReactDOM.createRoot
  <BrowserRouter>
  <ShopContextProvider>
  <App />

  </ShopContextProvider>
  </BrowserRouter>
);
