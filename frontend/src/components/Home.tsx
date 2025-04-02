// src/pages/Home.tsx
import React from 'react';
import Hero from '../components/home/Hero';
import PopularDestinations from '../components/home/PopularDestinations';
import TopRatedSpots from '../components/home/TopRatedSpots';
import ChargingClub from '../components/home/ChargingClub';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <Hero />
      <PopularDestinations />
      <TopRatedSpots />
      <ChargingClub />
    </div>
  );
};

export default Home;