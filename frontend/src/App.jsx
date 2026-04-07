import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<div className="flex items-center justify-center h-screen bg-primary text-white"><h1>404 - Page Not Found</h1></div>} />
      </Routes>
    </Router>
  );
}

export default App;
