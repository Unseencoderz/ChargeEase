import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Map, 
  List, 
  Filter, 
  SlidersHorizontal,
  MapPin,
  Star,
  Zap,
  Clock,
  DollarSign
} from 'lucide-react';
import SearchBar from '../components/home/SearchBar';
import GoogleMap from '../components/common/GoogleMap';
import Button from '../components/ui/Button';
import { useQuery } from '@tanstack/react-query';
import { stationService } from '../services/api';
import { ChargingStation, SearchFilters } from '../types';
import { formatDistance, formatPrice, getAvailabilityColor } from '../utils/helpers';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});

  // Parse URL parameters
  useEffect(() => {
    const view = searchParams.get('view');
    if (view === 'map') setViewMode('map');

    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    if (lat && lng) {
      setFilters(prev => ({
        ...prev,
        location: {
          latitude: parseFloat(lat),
          longitude: parseFloat(lng),
          radius: 25
        }
      }));
    }
  }, [searchParams]);

  // Search stations query
  const { 
    data: searchResult, 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['stations', 'search', filters],
    queryFn: () => stationService.searchStations(filters),
    enabled: Object.keys(filters).length > 0,
  });

  const handleSearch = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    refetch();
  };

  const handleViewChange = (mode: 'list' | 'map') => {
    setViewMode(mode);
    const params = new URLSearchParams(searchParams);
    if (mode === 'map') {
      params.set('view', 'map');
    } else {
      params.delete('view');
    }
    setSearchParams(params);
  };

  const StationCard: React.FC<{ station: ChargingStation }> = ({ station }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {station.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {station.address}
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center mb-1">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {station.rating}
            </span>
            <span className="text-xs text-gray-500 ml-1">
              ({station.reviewCount})
            </span>
          </div>
          {station.distance && (
            <p className="text-xs text-gray-500">
              {formatDistance(station.distance)} mi
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium`}
              style={{ 
                backgroundColor: `${getAvailabilityColor(station.availability.status)}20`,
                color: getAvailabilityColor(station.availability.status)
              }}>
          {station.availability.status}
        </span>
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
          <Zap className="w-3 h-3 mr-1" />
          {station.chargingSpeed}
        </span>
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
          <DollarSign className="w-3 h-3 mr-1" />
          {station.pricing.perKwh ? formatPrice(station.pricing.perKwh) + '/kWh' : 'Pricing varies'}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex -space-x-1">
          {station.connectorTypes.slice(0, 3).map((connector, index) => (
            <div
              key={index}
              className="w-8 h-8 bg-gray-100 dark:bg-gray-700 border-2 border-white dark:border-gray-800 rounded-full flex items-center justify-center text-xs font-medium"
              title={connector.type}
            >
              {connector.type.slice(0, 2)}
            </div>
          ))}
          {station.connectorTypes.length > 3 && (
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 border-2 border-white dark:border-gray-800 rounded-full flex items-center justify-center text-xs font-medium">
              +{station.connectorTypes.length - 3}
            </div>
          )}
        </div>
        
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            Details
          </Button>
          <Button size="sm">
            Book Now
          </Button>
        </div>
      </div>
    </motion.div>
  );

  const MapView: React.FC = () => {
    const center = filters.location ? 
      { lat: filters.location.latitude, lng: filters.location.longitude } : 
      { lat: 37.7749, lng: -122.4194 }; // Default to San Francisco

    return (
      <GoogleMap
        center={center}
        height="600px"
        showControls={true}
        searchQuery="EV charging stations"
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with Search Bar */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <SearchBar 
            onSearch={handleSearch} 
            compact={true}
            className="mb-4"
          />
          
          {/* View Toggle and Filters */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => handleViewChange('list')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <List className="w-4 h-4" />
                  <span>List</span>
                </button>
                <button
                  onClick={() => handleViewChange('map')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'map'
                      ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Map className="w-4 h-4" />
                  <span>Map</span>
                </button>
              </div>
              
              {searchResult && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {searchResult.total} stations found
                </p>
              )}
            </div>
            
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              leftIcon={<SlidersHorizontal className="w-4 h-4" />}
            >
              Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full lg:w-80 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-fit"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Filters
              </h3>
              
              {/* Filter content would go here */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Distance
                  </label>
                  <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg">
                    <option>Within 5 miles</option>
                    <option>Within 10 miles</option>
                    <option>Within 25 miles</option>
                    <option>Within 50 miles</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Charging Speed
                  </label>
                  <div className="space-y-2">
                    {['Level 1', 'Level 2', 'DC Fast', 'Supercharger'].map(speed => (
                      <label key={speed} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{speed}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Availability
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Available now</span>
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-2/3"></div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>
            ) : viewMode === 'map' ? (
              <MapView />
            ) : searchResult?.stations.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {searchResult.stations.map((station) => (
                  <StationCard key={station.id} station={station} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                  No stations found
                </h3>
                <p className="text-sm text-gray-500">
                  Try adjusting your search criteria or location
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;