// src/components/auth/Login.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic dummy validation
    if (!email || !password) {
      setError('Please fill out all fields.');
      return;
    }

    if (email !== 'admin@example.com' || password !== 'password') {
      setError('Invalid email or password.');
      return;
    }

    setError('');
    // Handle successful login (redirect, etc.)
    console.log('Logged in!');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md mx-4"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-orange-500 dark:text-orange-400">Login</h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-semibold">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                className="mr-2"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember Me
            </label>
            <Link to="/forgot-password" className="text-orange-500 hover:underline text-sm">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
          >
            Log In
          </button>

          <div className="text-center text-sm mt-4">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-orange-500 hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;