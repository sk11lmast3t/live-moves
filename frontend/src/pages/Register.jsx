import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/contentService';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.register(form.username, form.email, form.password, form.firstName, form.lastName);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-secondary mb-8 text-center">Create Account</h1>
        {error && <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-white mb-2">Username</label>
            <input id="username" name="username" value={form.username} onChange={handleChange} required placeholder="Username" className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="firstName" className="block text-white mb-2">First name</label>
              <input id="firstName" name="firstName" value={form.firstName} onChange={handleChange} placeholder="First name" className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white" />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-white mb-2">Last name</label>
              <input id="lastName" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last name" className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white" />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-white mb-2">Email</label>
            <input id="email" type="email" name="email" value={form.email} onChange={handleChange} required placeholder="Email" className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white" />
          </div>
          <div>
            <label htmlFor="password" className="block text-white mb-2">Password</label>
            <input id="password" type="password" name="password" value={form.password} onChange={handleChange} required placeholder="Password" className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-secondary text-white py-2 rounded-lg font-bold disabled:opacity-50">
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center text-gray-400 mt-6">
          Already have an account? <Link to="/login" className="text-secondary hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
