// src/components/home/TopRatedSpots.tsx
import React from 'react';
import { BookmarkIcon } from './icons';

type ChargingSpotProps = {
  id: number;
  name: string;
  location: string;
  rating: number;
  price: string;
  imageUrl: string;
  isBookmarked?: boolean;
};

const ChargingSpotCard: React.FC<ChargingSpotProps> = ({ 
  name, 
  location, 
  rating, 
  price, 
  imageUrl, 
  isBookmarked = false
}) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="relative h-40">
        {/* We would use actual images in a real implementation */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        
        <div className="absolute top-2 right-2">
          <button aria-label="Bookmark this charging spot" className="text-white hover:text-yellow-400 transition-colors">
            <BookmarkIcon filled={isBookmarked} />
          </button>
        </div>
        
        <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
          {rating}
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="text-white font-medium">{name}</h3>
        <p className="text-gray-400 text-sm mb-2">{location}</p>
        
        <div className="flex justify-between items-center">
          <p className="text-white">
            from <span className="font-semibold">{price}</span>/hour
          </p>
          <button className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};


const TopRatedSpots: React.FC = () => {
  // In a real implementation, this would come from an API
  const spots = [
    { 
      id: 1, 
      name: 'Green Charge Hub', 
      location: 'New York City', 
      rating: 4.8, 
      price: '$1',
      imageUrl: '/images/spots/green-charge.jpg'
    },
    { 
      id: 2, 
      name: 'EcoCharge Station', 
      location: 'Tokyo', 
      rating: 4.6, 
      price: '$1.50',
      imageUrl: '/images/spots/eco-charge.jpg'
    },
    { 
      id: 3, 
      name: 'PowerUp Plaza', 
      location: 'Berlin', 
      rating: 4.7, 
      price: '$2',
      imageUrl: '/images/spots/power-up.jpg'
    },
    { 
      id: 4, 
      name: 'EcoPower Hub', 
      location: 'Sydney', 
      rating: 4.5, 
      price: '$1.80',
      imageUrl: '/images/spots/eco-power.jpg'
    },
    { 
      id: 5, 
      name: 'EcoCharge Inn', 
      location: 'Rome', 
      rating: 4.2, 
      price: '$1.20',
      imageUrl: '/images/spots/eco-inn.jpg'
    },
  ];
  
  return (
    <section className="mt-12">
      <h2 className="text-lg font-semibold mb-4 text-white">Top-rated charging spots</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {spots.map((spot) => (
          <ChargingSpotCard 
            key={spot.id}
            {...spot}
          />
        ))}
      </div>
    </section>
  );
};

export default TopRatedSpots;