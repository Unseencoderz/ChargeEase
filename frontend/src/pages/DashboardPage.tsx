import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar,
  MapPin,
  Zap,
  Clock,
  TrendingUp,
  Car,
  Battery,
  DollarSign,
  Star,
  Navigation,
  Plus,
  Settings
} from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { Booking, ChargingStation } from '../types';
import { formatPrice, formatDate } from '../utils/helpers';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [recentSessions, setRecentSessions] = useState<Booking[]>([]);
  const [favoriteStations, setFavoriteStations] = useState<ChargingStation[]>([]);
  const [stats, setStats] = useState({
    totalSessions: 24,
    totalEnergy: 890,
    totalSpent: 267,
    carbonSaved: 156
  });

  useEffect(() => {
    // Mock data - in real app this would come from API
    const mockUpcomingBookings: Booking[] = [
      {
        id: '1',
        userId: user?.id || '1',
        stationId: '1',
        station: {
          id: '1',
          name: 'Tesla Supercharger - Downtown',
          address: '123 Main St, San Francisco, CA',
          latitude: 37.7749,
          longitude: -122.4194,
          rating: 4.8,
          reviewCount: 247,
          amenities: ['Restaurant', 'WiFi'],
          connectorTypes: [{ type: 'Tesla', maxPower: 250, available: true, count: 8 }],
          chargingSpeed: 'Supercharger',
          pricing: { perKwh: 0.28, currency: 'USD' },
          availability: { status: 'Available', availableConnectors: 6, totalConnectors: 8 },
          images: ['https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400'],
          operatingHours: { isOpen24Hours: true },
          hostType: 'Tesla'
        },
        startTime: new Date(Date.now(),  3600000).toISOString(), // 1 hour from now
        endTime: new Date(Date.now() , 7200000).toISOString(), // 2 hours from now
        duration: 60,
        connectorType: 'Tesla',
        status: 'Confirmed',
        totalCost: 15.68,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    const mockRecentSessions: Booking[] = [
      {
        id: '2',
        userId: user?.id || '1',
        stationId: '2',
        station: {
          id: '2',
          name: 'ChargePoint Station - Mall',
          address: '456 Shopping Blvd, San Francisco, CA',
          latitude: 37.7849,
          longitude: -122.4094,
          rating: 4.5,
          reviewCount: 156,
          amenities: ['Shopping', 'Restrooms'],
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
      }
    ];

    setUpcomingBookings(mockUpcomingBookings);
    setRecentSessions(mockRecentSessions);
  }, [user]);

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    unit?: string;
    icon: React.ReactNode;
    trend?: string;
    color: string;
  }> = ({ title, value, unit, icon, trend, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <div className="flex items-baseline space-x-1">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            {unit && <span className="text-sm text-gray-500">{unit}</span>}
          </div>
          {trend && (
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );

  const BookingCard: React.FC<{ booking: Booking; isUpcoming?: boolean }> = ({ 
    booking, 
    isUpcoming = false 
  }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
            {booking.station.name}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center mt-1">
            <MapPin className="w-3 h-3 mr-1" />
            {booking.station.address}
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          booking.status === 'Confirmed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
          booking.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
          'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
        }`}>
          {booking.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <Calendar className="w-3 h-3 mr-1" />
          {formatDate(booking.startTime, 'datetime')}
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <Clock className="w-3 h-3 mr-1" />
          {booking.duration} min
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <Zap className="w-3 h-3 mr-1" />
          {booking.connectorType}
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <DollarSign className="w-3 h-3 mr-1" />
          {formatPrice(booking.totalCost)}
        </div>
      </div>

      {isUpcoming && (
        <div className="flex space-x-2 mt-3">
          <Button size="sm" variant="outline" className="flex-1">
            <Navigation className="w-3 h-3 mr-1" />
            Directions
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            Modify
          </Button>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Here's your charging activity and upcoming sessions.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Sessions"
            value={stats.totalSessions}
            icon={<Zap className="w-6 h-6 text-white" />}
            trend="12% this month"
            color="bg-blue-500"
          />
          <StatCard
            title="Energy Consumed"
            value={stats.totalEnergy}
            unit="kWh"
            icon={<Battery className="w-6 h-6 text-white" />}
            trend="8% this month"
            color="bg-green-500"
          />
          <StatCard
            title="Total Spent"
            value={formatPrice(stats.totalSpent)}
            icon={<DollarSign className="w-6 h-6 text-white" />}
            trend="-5% this month"
            color="bg-orange-500"
          />
          <StatCard
            title="CO₂ Saved"
            value={stats.carbonSaved}
            unit="kg"
            icon={<Car className="w-6 h-6 text-white" />}
            trend="15% this month"
            color="bg-emerald-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Bookings */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Upcoming Sessions
                </h2>
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Book Session
                </Button>
              </div>

              {upcomingBookings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} isUpcoming />
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No upcoming sessions
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Book your next charging session to see it here.
                  </p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Book Now
                  </Button>
                </div>
              )}
            </div>

            {/* Recent Sessions */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Recent Sessions
                </h2>
                <Button size="sm" variant="ghost">
                  View All
                </Button>
              </div>

              <div className="space-y-4">
                {recentSessions.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button className="w-full justify-start">
                  <MapPin className="w-4 h-4 mr-3" />
                  Find Nearby Stations
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-3" />
                  Schedule Charging
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Car className="w-4 h-4 mr-3" />
                  Manage Vehicles
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-3" />
                  Account Settings
                </Button>
              </div>
            </div>

            {/* Favorite Stations */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Favorite Stations
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      Tesla Supercharger
                    </p>
                    <p className="text-xs text-gray-500 truncate">Downtown Plaza</p>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-500">4.8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Membership Status */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-md p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">
                {user?.membershipLevel} Member
              </h3>
              <p className="text-orange-100 text-sm mb-4">
                {user?.membershipLevel === 'Free' 
                  ? 'Upgrade to Premium for exclusive benefits and discounts.'
                  : 'Enjoy your Premium benefits and exclusive discounts!'
                }
              </p>
              {user?.membershipLevel === 'Free' && (
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-orange-600">
                  Upgrade Now
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
