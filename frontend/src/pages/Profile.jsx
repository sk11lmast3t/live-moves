import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { authService } from '../services/contentService';

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  if (!localStorage.getItem('token')) {
    return null;
  }

  return (
    <div className="bg-primary min-h-screen text-white">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
        <div className="bg-gray-800 rounded-lg p-6 space-y-3">
          <p><span className="text-gray-400">Username:</span> {user?.username || 'N/A'}</p>
          <p><span className="text-gray-400">Email:</span> {user?.email || 'N/A'}</p>
          <p><span className="text-gray-400">Name:</span> {user?.fullName || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'N/A'}</p>
          <button onClick={handleLogout} className="mt-4 bg-secondary px-4 py-2 rounded-lg font-bold">Logout</button>
        </div>
      </main>
    </div>
  );
};

export default Profile;
