// src/components/layout/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <div className="flex items-center">
        <h1 className="text-xl font-bold mr-10">ChargeEase</h1>
        <nav className="hidden sm:flex space-x-6">
          <a href="#" className="hover:text-gray-300">Charging Stations</a>
          <a href="#" className="hover:text-gray-300">Availability</a>
          <a href="#" className="hover:text-gray-300">Reserve</a>
        </nav>
      </div>
      <div className="flex space-x-2">
        <button className="px-4 py-1 bg-transparent border border-white rounded-full text-white hover:bg-white hover:text-gray-900 transition-colors">
          Sign up
        </button>
        <button className="px-4 py-1 bg-orange-500 rounded-full text-white hover:bg-orange-600 transition-colors">
          Log in
        </button>
      </div>
    </header>
  );
};

export default Header;