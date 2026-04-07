import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Browse from './pages/Browse';
import ContentDetails from './pages/ContentDetails';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies" element={<Browse />} />
        <Route path="/shows" element={<Browse />} />
        <Route path="/trending" element={<Browse />} />
        <Route path="/search" element={<Browse />} />
        <Route path="/content/:id" element={<ContentDetails />} />
        <Route path="*" element={<div className="flex items-center justify-center h-screen bg-primary text-white"><h1>404 - Page Not Found</h1></div>} />
      </Routes>
    </Router>
  );
}

export default App;
