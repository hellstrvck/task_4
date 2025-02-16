import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import './styles/main.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <HomePage />
      </div>
    </BrowserRouter>
  );
}

export default App; 