// src/components/home/PopularDestinations.tsx
import React from 'react';

type DestinationProps = {
  country: string;
  imageUrl: string;
};

const DestinationCard: React.FC<DestinationProps> = ({ country, imageUrl }) => {
  return (
    <div className="relative rounded-lg overflow-hidden h-40 md:h-60 group cursor-pointer">
      {/* We would use actual images in a real implementation */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-30 transition-opacity"></div>
      <div className="absolute bottom-3 left-3 bg-white px-3 py-1 rounded-full text-sm font-medium">
        {country}
      </div>
    </div>
  );
};

const PopularDestinations: React.FC = () => {
  // In a real implementation, this would come from an API
  const destinations = [
    { id: 1, country: 'USA', imageUrl: '/images/destinations/usa.jpg' },
    { id: 2, country: 'Japan', imageUrl: '/images/destinations/japan.jpg' },
    { id: 3, country: 'Italy', imageUrl: '/images/destinations/italy.jpg' },
    { id: 4, country: 'Germany', imageUrl: '/images/destinations/germany.jpg' },
    { id: 5, country: 'France', imageUrl: '/images/destinations/france.jpg' },
    { id: 6, country: 'Australia', imageUrl: '/images/destinations/australia.jpg' },
  ];
  
  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold mb-4 text-white">Popular charging destinations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {destinations.map((destination) => (
          <DestinationCard 
            key={destination.id}
            country={destination.country}
            imageUrl={destination.imageUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default PopularDestinations;