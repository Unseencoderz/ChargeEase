// src/components/home/SearchBar.tsx
import React from 'react';

const SearchBar: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-full p-2 w-full max-w-3xl flex items-center">
      <div className="flex flex-col md:flex-row w-full justify-between items-center">
        <div className="p-2 w-full md:w-1/4">
          <div className="text-xs text-gray-400 mb-1">Location</div>
          <div className="text-sm">Where to charge?</div>
        </div>
        
        <div className="p-2 w-full md:w-1/4">
          <div className="text-xs text-gray-400 mb-1">Check-in</div>
          <div className="text-sm">Select date</div>
        </div>
        
        <div className="p-2 w-full md:w-1/4">
          <div className="text-xs text-gray-400 mb-1">Check-out</div>
          <div className="text-sm">Select date</div>
        </div>
        
        <div className="p-2 w-full md:w-1/4">
          <div className="text-xs text-gray-400 mb-1">Drivers</div>
          <div className="text-sm">Number of drivers</div>
        </div>
        
        <button className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;