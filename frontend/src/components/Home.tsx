// src/components/Home.tsx
import React from 'react';
import Hero from './home/Hero';
import PopularDestinations from './home/PopularDestinations';
import TopRatedSpots from './home/TopRatedSpots';
import ChargingClub from './home/ChargingClub';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <div className="container mx-auto px-4 py-12 space-y-16">
        <PopularDestinations />
        <TopRatedSpots />
        <ChargingClub />
      </div>
    </div>
  );
};

export default Home;