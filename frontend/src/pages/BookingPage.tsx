
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar,
  Clock,
  MapPin,
  Zap,
  DollarSign,
  ArrowLeft,
  Filter,
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Navigation
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Booking } from '../types';
import { formatPrice, formatDate } from '../utils/helpers';

const BookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get station ID from URL params if booking from station details
  const stationId = searchParams.get('stationId');

  useEffect(() => {
    // Mock bookings data
    const mockBookings: Booking[] = [
      {
        id: '1',
        userId: '1',
        stationId: '1',
        station: {
          id: '1',
          name: 'Tesla Supercharger - Downtown Plaza',
          address: '123 Main St, San Francisco, CA 94102',
          latitude: 37.7749,
          longitude: -122.4194,
          rating: 4.8,
          reviewCount: 247,
          amenities: ['Restaurant', 'WiFi', 'Restrooms'],
          connectorTypes: [{ type: 'Tesla', maxPower: 250, available: true, count: 8 }],
          chargingSpeed: 'Supercharger',
          pricing: { perKwh: 0.28, currency: 'USD' },
          availability: { status: 'Available', availableConnectors: 6, totalConnectors: 8 },
          images: ['https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400'],
          operatingHours: { isOpen24Hours: true },
          hostType: 'Tesla'
        },
        startTime: new Date(Date.now() , 3600000).toISOString(), // 1 hour from now
        endTime: new Date(Date.now() , 7200000).toISOString(), // 2 hours from now
        duration: 60,
        connectorType: 'Tesla',
        status: 'Confirmed',
        totalCost: 15.68,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        userId: '1',
        stationId: '2',
        station: {
          id: '2',
          name: 'ChargePoint Station - Shopping Mall',
          address: '456 Shopping Blvd, San Francisco, CA 94103',
          latitude: 37.7849,
          longitude: -122.4094,
          rating: 4.5,
          reviewCount: 156,
          amenities: ['Shopping', 'Restrooms', 'Food Court'],
          connectorTypes: [{ type: 'CCS', maxPower: 150, available: true, count: 4 }],
          chargingSpeed: 'DC Fast',
          pricing: { perKwh: 0.32, currency: 'USD' },
          availability: { status: 'Available', availableConnectors: 3, totalConnectors: 4 },
          images: ['https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400'],
          operatingHours: { isOpen24Hours: false },
          hostType: 'ChargePoint'
        },
        startTime: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        endTime: new Date(Date.now() - 82800000).toISOString(),
        duration: 60,
        connectorType: 'CCS',
        status: 'Completed',
        totalCost: 22.40,
        energyDelivered: 45,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: '3',
        userId: '1',
        stationId: '3',
        station: {
          id: '3',
          name: 'EVgo Fast Charging - Airport',
          address: '789 Airport Blvd, San Francisco, CA 94128',
          latitude: 37.6213,
          longitude: -122.3790,
          rating: 4.2,
          reviewCount: 89,
          amenities: ['24/7 Access', 'Security Cameras'],
          connectorTypes: [{ type: 'CHAdeMO', maxPower: 100, available: true, count: 2 }],
          chargingSpeed: 'DC Fast',
          pricing: { perKwh: 0.35, currency: 'USD' },
          availability: { status: 'Available', availableConnectors: 1, totalConnectors: 2 },
          images: ['https://images.unsplash.com/photo-1558618047-d50b9bdd2a9b?w=400'],
          operatingHours: { isOpen24Hours: true },
          hostType: 'EVgo'
        },
        startTime: new Date(Date.now() , 86400000).toISOString(), // Tomorrow
        endTime: new Date(Date.now() , 90000000).toISOString(),
        duration: 60,
        connectorType: 'CHAdeMO',
        status: 'Confirmed',
        totalCost: 18.90,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    setBookings(mockBookings);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    let filtered = bookings;

    // Filter by status
    if (filter !== 'all') {
      filtered = filtered.filter(booking => {
        const now = new Date();
        const startTime = new Date(booking.startTime);
        
        switch (filter) {
          case 'upcoming':
            return startTime > now && booking.status !== 'Cancelled';
          case 'completed':
            return booking.status === 'Completed';
          case 'cancelled':
            return booking.status === 'Cancelled';
          default:
            return true;
        }
      });
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(booking =>
        booking.station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.station.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBookings(filtered);
  }, [bookings, filter, searchQuery]);

  const getStatusColor = (status: string, startTime: string) => {
    const now = new Date();
    const start = new Date(startTime);
    
    if (status === 'Cancelled') return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
    if (status === 'Completed') return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    if (start > now) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
  };

  const getStatusText = (status: string, startTime: string) => {
    const now = new Date();
    const start = new Date(startTime);
    
    if (status === 'Cancelled') return 'Cancelled';
    if (status === 'Completed') return 'Completed';
    if (start > now) return 'Upcoming';
    return 'In Progress';
  };

  const BookingCard: React.FC<{ booking: Booking }> = ({ booking }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {booking.station.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {booking.station.address}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status, booking.startTime)}`}>
            {getStatusText(booking.status, booking.startTime)}
          </span>
          <button type='button' className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(booking.startTime, 'date')}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Clock className="w-4 h-4" />
          <span>{formatDate(booking.startTime, 'time')} - {formatDate(booking.endTime, 'time')}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Zap className="w-4 h-4" />
          <span>{booking.connectorType}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <DollarSign className="w-4 h-4" />
          <span>{formatPrice(booking.totalCost)}</span>
        </div>
      </div>

      {booking.energyDelivered && (
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Energy delivered: <span className="font-medium text-gray-900 dark:text-white">{booking.energyDelivered} kWh</span>
          </p>
        </div>
      )}

      <div className="flex space-x-3">
        {getStatusText(booking.status, booking.startTime) === 'Upcoming' && (
          <>
            <Button size="sm" variant="outline" className="flex-1">
              <Edit className="w-4 h-4 mr-2" />
              Modify
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              <Navigation className="w-4 h-4 mr-2" />
              Directions
            </Button>
            <Button size="sm" variant="destructive" className="flex-1">
              <Trash2 className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </>
        )}
        {booking.status === 'Completed' && (
          <Button size="sm" variant="outline" className="flex-1">
            Book Again
          </Button>
        )}
      </div>
    </motion.div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                My Bookings
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage your charging sessions and reservations
              </p>
            </div>
          </div>
          
          <Button onClick={() => navigate('/search')}>
            <Plus className="w-4 h-4 mr-2" />
            New Booking
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Search */}
            <div className="relative flex-1 md:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search stations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {[
                { key: 'all', label: 'All' },
                { key: 'upcoming', label: 'Upcoming' },
                { key: 'completed', label: 'Completed' },
                { key: 'cancelled', label: 'Cancelled' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key as any)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    filter === tab.key
                      ? 'bg-white dark:bg-gray-600 text-orange-600 dark:text-orange-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length > 0 ? (
          <div className="space-y-6">
            {filteredBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              {filter === 'all' ? 'No bookings found' : `No ${filter} bookings`}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchQuery 
                ? `No bookings match your search "${searchQuery}"`
                : filter === 'all' 
                  ? "You haven't made any bookings yet. Find a charging station to get started."
                  : `You don't have any ${filter} bookings.`
              }
            </p>
            {filter === 'all' && !searchQuery && (
              <Button onClick={() => navigate('/search')}>
                <Plus className="w-4 h-4 mr-2" />
                Book Your First Session
              </Button>
            )}
          </div>
        )}

        {/* Summary Stats */}
        {filteredBookings.length > 0 && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Booking Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {filteredBookings.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Bookings</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {filteredBookings.filter(b => b.status === 'Completed').length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {filteredBookings.filter(b => new Date(b.startTime) > new Date() && b.status !== 'Cancelled').length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Upcoming</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatPrice(filteredBookings.reduce((sum, b) => sum + b.totalCost, 0))}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Spent</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
