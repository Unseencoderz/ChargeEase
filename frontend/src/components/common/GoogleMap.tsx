// src/components/common/GoogleMap.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Navigation, 
  Layers, 
  Maximize2, 
  Minimize2,
  Search,
  Filter,
  Zap,
  Battery,
  Clock,
  DollarSign
} from 'lucide-react';
import Button from '../ui/Button';

interface GoogleMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: string;
  showControls?: boolean;
  searchQuery?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  center = { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
  zoom = 12,
  height = '400px',
  showControls = true,
  searchQuery = 'EV charging stations'
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'hybrid' | 'terrain'>('roadmap');
  const [showFilters, setShowFilters] = useState(false);

  // Mock charging stations data - replace with actual API data
  const chargingStations = [
    {
      id: '1',
      name: 'Tesla Supercharger - Downtown SF',
      address: '123 Market St, San Francisco, CA',
      lat: 37.7849,
      lng: -122.4094,
      type: 'Supercharger',
      available: 8,
      total: 12,
      price: '$0.28/kWh',
      rating: 4.8
    },
    {
      id: '2',
      name: 'ChargePoint Station',
      address: '456 Mission St, San Francisco, CA',
      lat: 37.7749,
      lng: -122.4194,
      type: 'Level 2',
      available: 3,
      total: 6,
      price: '$0.22/kWh',
      rating: 4.5
    },
    {
      id: '3',
      name: 'EVgo Fast Charging',
      address: '789 Howard St, San Francisco, CA',
      lat: 37.7649,
      lng: -122.4294,
      type: 'DC Fast',
      available: 2,
      total: 4,
      price: '$0.35/kWh',
      rating: 4.3
    }
  ];

  // Construct Google Maps embed URL with charging stations
  const constructMapUrl = () => {
    const baseUrl = 'https://www.google.com/maps/embed/v1/search';
    const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with actual API key
    const query = encodeURIComponent(`${searchQuery} near ${center.lat},${center.lng}`);
    
    // For now, using a generic embed URL - replace with proper API integration
    return `${baseUrl}?key=${apiKey}&q=${query}&zoom=${zoom}&maptype=${mapType}`;
  };

  // Fallback URL for demo purposes (remove when proper API key is available)
  const demoMapUrl = `https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d50372.43481687077!2d-122.4629!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sEV%20charging%20stations%20san%20francisco!5e0!3m2!1sen!2sus!4v1647834123456!5m2!1sen!2sus`;

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`glass-card overflow-hidden ${isFullscreen ? 'h-screen' : ''}`}
        style={{ height: isFullscreen ? '100vh' : height }}
      >
        {/* Map Controls */}
        {showControls && (
          <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* Search Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for charging stations..."
                  className="w-64 px-4 py-2 pl-10 bg-white/90 backdrop-blur-sm border border-white/20 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>

              {/* Filter Button */}
              <Button
                variant="glass"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                leftIcon={<Filter className="w-4 h-4" />}
              >
                Filters
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              {/* Map Type Selector */}
              <select
                value={mapType}
                onChange={(e) => setMapType(e.target.value as any)}
                className="px-3 py-2 bg-white/90 backdrop-blur-sm border border-white/20 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="roadmap">Roadmap</option>
                <option value="satellite">Satellite</option>
                <option value="hybrid">Hybrid</option>
                <option value="terrain">Terrain</option>
              </select>

              {/* Fullscreen Toggle */}
              <Button
                variant="glass"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                leftIcon={isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              >
                {isFullscreen ? 'Exit' : 'Fullscreen'}
              </Button>
            </div>
          </div>
        )}

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-16 left-4 z-10 w-80 glass-card p-4"
          >
            <h3 className="font-semibold text-white mb-4">Filter Charging Stations</h3>
            
            <div className="space-y-4">
              {/* Charging Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Charging Type</label>
                <div className="space-y-2">
                  {['Level 1', 'Level 2', 'DC Fast', 'Supercharger'].map((type) => (
                    <label key={type} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-600 text-blue-500 focus:ring-blue-500" />
                      <span className="text-sm text-gray-300">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Availability</label>
                <select className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Any</option>
                  <option value="available">Available Now</option>
                  <option value="busy">Busy</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Max Price per kWh</label>
                <input
                  type="range"
                  min="0.15"
                  max="0.50"
                  step="0.01"
                  className="w-full accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>$0.15</span>
                  <span>$0.50</span>
                </div>
              </div>

              {/* Distance */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Within Distance</label>
                <select className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="5">5 miles</option>
                  <option value="10">10 miles</option>
                  <option value="25">25 miles</option>
                  <option value="50">50 miles</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-2 mt-4">
              <Button variant="gradient" size="sm" fullWidth>
                Apply Filters
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                Close
              </Button>
            </div>
          </motion.div>
        )}

        {/* Google Maps Iframe */}
        <iframe
          src={demoMapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg"
        />

        {/* Station Info Cards (Overlay) */}
        {!isFullscreen && (
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {chargingStations.map((station) => (
                <motion.div
                  key={station.id}
                  whileHover={{ scale: 1.02 }}
                  className="flex-shrink-0 w-80 glass-card p-4 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-white text-sm">{station.name}</h3>
                      <p className="text-xs text-gray-400">{station.address}</p>
                    </div>
                    <div className="flex items-center space-x-1 text-xs">
                      <span className="text-yellow-400">★</span>
                      <span className="text-gray-300">{station.rating}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-3 text-xs">
                    <div className="text-center">
                      <div className="w-8 h-8 mx-auto mb-1 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Zap className="w-4 h-4 text-blue-400" />
                      </div>
                      <p className="text-gray-400">{station.type}</p>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 mx-auto mb-1 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <Battery className="w-4 h-4 text-green-400" />
                      </div>
                      <p className="text-gray-400">{station.available}/{station.total}</p>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 mx-auto mb-1 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-4 h-4 text-purple-400" />
                      </div>
                      <p className="text-gray-400">{station.price}</p>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 mx-auto mb-1 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        <Navigation className="w-4 h-4 text-orange-400" />
                      </div>
                      <p className="text-gray-400">0.5 mi</p>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-3">
                    <Button variant="gradient" size="sm" className="flex-1">
                      Navigate
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1">
                      Details
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Current Location Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute bottom-20 right-4 z-10 w-12 h-12 glass-button rounded-full flex items-center justify-center glow-electric"
        >
          <Navigation className="w-5 h-5 text-blue-400" />
        </motion.button>
      </motion.div>

      {/* Legend */}
      {!isFullscreen && (
        <div className="mt-4 glass-card p-4">
          <h4 className="font-semibold text-white mb-3">Map Legend</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-300">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-300">Busy</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-300">Offline</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-300">Your Location</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMap;