// src/components/home/ChargingClub.tsx
import React from 'react';

const ChargingClub: React.FC = () => {
  return (
    <div className="mt-12 bg-gray-800 rounded-lg p-4 flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center mb-4 md:mb-0">
        <div className="mr-3">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 10V3L4 14h7v7l9-11h-7z" 
            />
          </svg>
        </div>
        <div>
          <h3 className="text-white font-medium">Psst!</h3>
          <p className="text-gray-400 text-sm">Want exclusive deals and real-time updates on available charging spots? Join our Charging Club now!</p>
        </div>
      </div>
      
      <button className="bg-white text-gray-900 px-6 py-2 rounded-full hover:bg-gray-200 transition-colors">
        Join now
      </button>
    </div>
  );
};

export default ChargingClub;