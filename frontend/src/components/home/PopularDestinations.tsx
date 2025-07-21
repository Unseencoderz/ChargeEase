// src/components/home/PopularDestinations.tsx
import React from 'react';

type DestinationProps = {
  city: string;
  imageUrl: string;
};

const DestinationCard: React.FC<DestinationProps> = ({ city, imageUrl }) => {
  return (
    <div className="relative rounded-lg overflow-hidden h-40 md:h-60 group cursor-pointer">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-70 transition-opacity"></div>
      <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg text-sm font-medium shadow-md">
        {city}
      </div>
    </div>
  );
};

const PopularDestinations: React.FC = () => {
  const destinations = [
    { id: 1, city: 'Mumbai', imageUrl: 'https://unsplash.com/photos/1-aA2Fadydc' },
    { id: 2, city: 'Delhi', imageUrl: 'https://unsplash.com/photos/1-aA2Fadydc' },
    { id: 3, city: 'Bangalore', imageUrl: 'https://unsplash.com/photos/1-aA2Fadydc' },
    { id: 4, city: 'Hyderabad', imageUrl: 'https://unsplash.com/photos/1-aA2Fadydc' },
    { id: 5, city: 'Chennai', imageUrl: 'https://unsplash.com/photos/1-aA2Fadydc' },
    { id: 6, city: 'Kolkata', imageUrl: 'https://unsplash.com/photos/1-aA2Fadydc' },
  ];
  
  
  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold mb-4 text-white">
        Popular EV Charging Destinations in India
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination) => (
          <DestinationCard 
            key={destination.id}
            city={destination.city}
            imageUrl={destination.imageUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default PopularDestinations;
