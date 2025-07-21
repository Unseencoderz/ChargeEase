// src/components/home/SearchBar.tsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  Filter,
  Loader2,
  Navigation
} from 'lucide-react';
import Button from '../ui/Button';
import { useGeolocation } from '../../hooks/useGeolocation';
import { SearchFilters } from '../../types';
import { formatDate } from '../../utils/helpers';

interface SearchBarProps {
  className?: string;
  onSearch?: (filters: SearchFilters) => void;
  compact?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  className = '', 
  onSearch,
  compact = false 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const { 
    latitude, 
    longitude, 
    isLoading: isLocationLoading, 
    getCurrentLocation 
  } = useGeolocation({ immediate: false });

  const handleLocationClick = async () => {
    await getCurrentLocation();
    if (latitude && longitude) {
      setSearchTerm('Current Location');
    }
  };

  const handleSearch = async () => {
    setIsSearching(true);
    
    const filters: SearchFilters = {
      location: latitude && longitude ? {
        latitude,
        longitude,
        radius: 25 // default radius
      } : undefined,
    };

    try {
      if (onSearch) {
        onSearch(filters);
      } else {
        // Navigate to search page with filters
        const searchParams = new URLSearchParams();
        if (searchTerm) searchParams.set('q', searchTerm);
        if (checkInDate) searchParams.set('checkIn', checkInDate);
        if (checkOutDate) searchParams.set('checkOut', checkOutDate);
        if (guests > 1) searchParams.set('guests', guests.toString());
        if (latitude && longitude) {
          searchParams.set('lat', latitude.toString());
          searchParams.set('lng', longitude.toString());
        }
        
        navigate(`/search?${searchParams.toString()}`);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (compact) {
    return (
      <div className={`relative ${className}`}>
        <div className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex-1 px-4 py-3">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search charging stations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full bg-transparent outline-none text-gray-700 dark:text-gray-300 placeholder-gray-500"
            />
          </div>
          <Button
            onClick={handleLocationClick}
            variant="ghost"
            size="icon"
            className="mx-2"
            isLoading={isLocationLoading}
          >
            <Navigation className="w-4 h-4" />
          </Button>
          <Button
            onClick={handleSearch}
            className="m-2 rounded-full"
            size="sm"
            isLoading={isSearching}
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-2 w-full max-w-4xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-2">
        {/* Location Search */}
        <div className="flex-1 min-w-0">
          <div className="p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Where</div>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search destination"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-gray-100 placeholder-gray-500 outline-none"
                />
              </div>
              <Button
                onClick={handleLocationClick}
                variant="ghost"
                size="icon"
                className="flex-shrink-0"
                isLoading={isLocationLoading}
              >
                <Navigation className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Check-in Date */}
        <div className="flex-1 min-w-0 lg:border-l lg:border-gray-200 dark:lg:border-gray-700">
          <div className="p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Check-in</div>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-gray-100 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Check-out Date */}
        <div className="flex-1 min-w-0 lg:border-l lg:border-gray-200 dark:lg:border-gray-700">
          <div className="p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Check-out</div>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  min={checkInDate || new Date().toISOString().split('T')[0]}
                  className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-gray-100 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Guests */}
        <div className="flex-1 min-w-0 lg:border-l lg:border-gray-200 dark:lg:border-gray-700">
          <div className="p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Vehicles</div>
                <select
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-gray-100 outline-none"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'vehicle' : 'vehicles'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Buttons */}
        <div className="flex items-center space-x-2 lg:pl-2">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            size="icon"
            className="flex-shrink-0"
          >
            <Filter className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={handleSearch}
            className="flex-shrink-0 px-6"
            isLoading={isSearching}
            leftIcon={<Search className="w-4 h-4" />}
          >
            Search
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                Charging Speed
              </label>
              <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700">
                <option value="">Any</option>
                <option value="Level 1">Level 1</option>
                <option value="Level 2">Level 2</option>
                <option value="DC Fast">DC Fast</option>
                <option value="Supercharger">Supercharger</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                Connector Type
              </label>
              <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700">
                <option value="">Any</option>
                <option value="J1772">J1772</option>
                <option value="CCS">CCS</option>
                <option value="CHAdeMO">CHAdeMO</option>
                <option value="Tesla">Tesla</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                Max Price
              </label>
              <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700">
                <option value="">Any</option>
                <option value="0.25">$0.25/kWh</option>
                <option value="0.50">$0.50/kWh</option>
                <option value="0.75">$0.75/kWh</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                Amenities
              </label>
              <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700">
                <option value="">Any</option>
                <option value="restrooms">Restrooms</option>
                <option value="restaurant">Restaurant</option>
                <option value="wifi">WiFi</option>
                <option value="24-7">24/7 Access</option>
              </select>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchBar;