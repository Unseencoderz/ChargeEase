import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  MapPin,
  Star,
  Clock,
  Zap,
  DollarSign,
  Car,
  Wifi,
  Coffee,
  ShoppingBag,
  Phone,
  Calendar,
  Heart,
  Share,
  Flag,
  Navigation
} from 'lucide-react';
import Button from '../components/ui/Button';
import { ChargingStation, Review } from '../types';
import { formatPrice, getAvailabilityColor } from '../utils/helpers';

const StationDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [station, setStation] = useState<ChargingStation | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock station data
  useEffect(() => {
    const fetchStationData = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockStation: ChargingStation = {
        id: id || '1',
        name: 'Tesla Supercharger - Downtown Plaza',
        address: '123 Main St, San Francisco, CA 94102',
        latitude: 37.7749,
        longitude: -122.4194,
        rating: 4.8,
        reviewCount: 247,
        distance: 0.3,
        amenities: ['Restrooms', 'Restaurant', 'Shopping', 'WiFi', 'Covered Parking'],
        connectorTypes: [
          { type: 'Tesla', maxPower: 250, available: true, count: 8 },
          { type: 'CCS', maxPower: 150, available: true, count: 4 }
        ],
        chargingSpeed: 'Supercharger',
        pricing: {
          perKwh: 0.28,
          sessionFee: 1.00,
          currency: 'USD'
        },
        availability: {
          status: 'Available',
          availableConnectors: 10,
          totalConnectors: 12,
          estimatedWaitTime: 0
        },
        images: [
          'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=800',
          'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
          'https://images.unsplash.com/photo-1558618047-d50b9bdd2a9b?w=800'
        ],
        operatingHours: {
          isOpen24Hours: true
        },
        hostType: 'Tesla'
      };

      const mockReviews: Review[] = [
        {
          id: '1',
          userId: '1',
          userName: 'John Doe',
          stationId: id || '1',
          rating: 5,
          title: 'Excellent charging experience',
          comment: 'Fast charging, clean facilities, and great location. The restaurant nearby is perfect while waiting.',
          helpful: 12,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          updatedAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: '2',
          userId: '2',
          userName: 'Jane Smith',
          stationId: id || '1',
          rating: 4,
          title: 'Good station, slight wait',
          comment: 'Generally good experience. Had to wait about 10 minutes during peak hours but charging was fast once connected.',
          helpful: 8,
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          updatedAt: new Date(Date.now() - 172800000).toISOString()
        }
      ];

      setStation(mockStation);
      setReviews(mockReviews);
      setIsLoading(false);
    };

    fetchStationData();
  }, [id]);

  const handleBookNow = () => {
    navigate(`/booking?stationId=${id}`);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: station?.name,
        text: `Check out this charging station: ${station?.name}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast here
    }
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi className="w-4 h-4" />;
      case 'restaurant': return <Coffee className="w-4 h-4" />;
      case 'shopping': return <ShoppingBag className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading station details...</p>
        </div>
      </div>
    );
  }

  if (!station) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Station not found</h1>
          <Button onClick={() => navigate('/search')} variant="outline">
            Back to search
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleFavorite}
                className={isFavorite ? 'text-red-500' : ''}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleShare}>
                <Share className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Flag className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={station.images[0]}
                alt={station.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="grid grid-cols-2 gap-2">
                {station.images.slice(1, 3).map((image, index) => (
                  <motion.img
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: (index + 1) * 0.1 }}
                    src={image}
                    alt={`${station.name} ${index + 2}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>

            {/* Station Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {station.name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {station.address}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center mb-1">
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {station.rating}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      ({station.reviewCount} reviews)
                    </span>
                  </div>
                  {station.distance && (
                    <p className="text-sm text-gray-500">{station.distance} miles away</p>
                  )}
                </div>
              </div>

              {/* Status and Pricing */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getAvailabilityColor(station.availability.status) }}
                  />
                  <span className="text-sm font-medium">{station.availability.status}</span>
                  <span className="text-sm text-gray-500">
                    ({station.availability.availableConnectors}/{station.availability.totalConnectors} available)
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">
                    {formatPrice(station.pricing.perKwh || 0)}/kWh
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">
                    {station.operatingHours.isOpen24Hours ? '24/7' : 'Limited hours'}
                  </span>
                </div>
              </div>

              {/* Connector Types */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Charging Options
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {station.connectorTypes.map((connector, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {connector.type}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Up to {connector.maxPower}kW
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {connector.count} connectors
                          </p>
                          <p className={`text-xs ${connector.available ? 'text-green-600' : 'text-red-600'}`}>
                            {connector.available ? 'Available' : 'Unavailable'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Amenities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {station.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 px-3 py-1 rounded-full text-sm"
                    >
                      {getAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Reviews ({reviews.length})
              </h3>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {review.userName}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                      {review.title}
                    </h5>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      {review.comment}
                    </p>
                    <button className="text-xs text-gray-500 hover:text-orange-600">
                      Helpful ({review.helpful})
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Book Now Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Reserve a spot
              </h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
                    defaultValue={new Date().toISOString().slice(0, 16)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Duration
                  </label>
                  <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700">
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                    <option value="240">4 hours</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Connector Type
                  </label>
                  <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700">
                    {station.connectorTypes.map((connector, index) => (
                      <option key={index} value={connector.type}>
                        {connector.type} - {connector.maxPower}kW
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <Button onClick={handleBookNow} className="w-full" size="lg">
                  <Calendar className="w-4 h-4 mr-2" />
                  Reserve Now
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Station
                </Button>
              </div>
            </div>

            {/* Location Map Placeholder */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Location
              </h3>
              <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Interactive map coming soon</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                {station.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationDetailsPage;