
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Car,
  CreditCard,
  Settings,
  Bell,
  Shield,
  Edit3,
  Save,
  X,
  Camera,
  Zap,
  Calendar,
  Award,
  TrendingUp,
  Battery,
  Clock,
  DollarSign
} from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../hooks/useAuth';

const profileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number').optional(),
  address: z.string().min(5, 'Please enter a valid address').optional(),
  vehicleModel: z.string().optional(),
  vehicleYear: z.string().optional(),
  batteryCapacity: z.string().optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // Mock user data - replace with actual user data
  const mockUser = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Electric Ave, San Francisco, CA 94102',
    avatar: null,
    memberSince: '2023-01-15',
    vehicleModel: 'Tesla Model 3',
    vehicleYear: '2023',
    batteryCapacity: '75 kWh',
    totalSessions: 156,
    totalEnergy: 2847,
    totalSavings: 1234,
    carbonOffset: 892,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: mockUser,
  });

  const stats = [
    {
      icon: Zap,
      label: 'Charging Sessions',
      value: mockUser.totalSessions.toString(),
      change: '+12%',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Battery,
      label: 'Energy Consumed',
      value: `${mockUser.totalEnergy} kWh`,
      change: '+8%',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: DollarSign,
      label: 'Money Saved',
      value: `$${mockUser.totalSavings}`,
      change: '+15%',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Award,
      label: 'Carbon Offset',
      value: `${mockUser.carbonOffset} lbs`,
      change: '+22%',
      color: 'from-orange-500 to-red-500'
    },
  ];

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'vehicle', label: 'Vehicle', icon: Car },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  const onSubmit = async (data: ProfileForm) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Profile updated:', data);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center space-x-6 mb-6 md:mb-0">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  {mockUser.avatar ? (
                    <img
                      src={mockUser.avatar}
                      alt={`${mockUser.firstName} ${mockUser.lastName}`}
                      className="w-24 h-24 rounded-2xl object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-white" />
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </motion.button>
              </div>

              {/* User Info */}
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {mockUser.firstName} {mockUser.lastName}
                </h1>
                <p className="text-gray-400 mb-1">{mockUser.email}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Member since {new Date(mockUser.memberSince).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>San Francisco, CA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              {!isEditing ? (
                <Button
                  variant="glass"
                  onClick={() => setIsEditing(true)}
                  leftIcon={<Edit3 className="w-4 h-4" />}
                >
                  Edit Profile
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    onClick={handleCancel}
                    leftIcon={<X className="w-4 h-4" />}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="gradient"
                    onClick={handleSubmit(onSubmit)}
                    isLoading={isLoading}
                    leftIcon={<Save className="w-4 h-4" />}
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} p-3`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-1 text-green-400 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="glass-card p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="glass-card p-8">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
                  
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          First Name
                        </label>
                        <Input
                          {...register('firstName')}
                          disabled={!isEditing}
                          className={`${!isEditing ? 'bg-gray-800/50' : ''}`}
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-sm text-red-400">{errors.firstName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Last Name
                        </label>
                        <Input
                          {...register('lastName')}
                          disabled={!isEditing}
                          className={`${!isEditing ? 'bg-gray-800/50' : ''}`}
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-sm text-red-400">{errors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Input
                          {...register('email')}
                          disabled={!isEditing}
                          className={`pl-12 ${!isEditing ? 'bg-gray-800/50' : ''}`}
                        />
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Input
                          {...register('phone')}
                          disabled={!isEditing}
                          className={`pl-12 ${!isEditing ? 'bg-gray-800/50' : ''}`}
                        />
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Address
                      </label>
                      <div className="relative">
                        <Input
                          {...register('address')}
                          disabled={!isEditing}
                          className={`pl-12 ${!isEditing ? 'bg-gray-800/50' : ''}`}
                        />
                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                      {errors.address && (
                        <p className="mt-1 text-sm text-red-400">{errors.address.message}</p>
                      )}
                    </div>
                  </form>
                </div>
              )}

              {activeTab === 'vehicle' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Vehicle Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Vehicle Model
                      </label>
                      <div className="relative">
                        <Input
                          {...register('vehicleModel')}
                          disabled={!isEditing}
                          className={`pl-12 ${!isEditing ? 'bg-gray-800/50' : ''}`}
                        />
                        <Car className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Year
                      </label>
                      <Input
                        {...register('vehicleYear')}
                        disabled={!isEditing}
                        className={`${!isEditing ? 'bg-gray-800/50' : ''}`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Battery Capacity
                      </label>
                      <div className="relative">
                        <Input
                          {...register('batteryCapacity')}
                          disabled={!isEditing}
                          className={`pl-12 ${!isEditing ? 'bg-gray-800/50' : ''}`}
                        />
                        <Battery className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <Zap className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Avg. Efficiency</p>
                          <p className="text-lg font-semibold text-white">4.2 mi/kWh</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <Clock className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Avg. Charge Time</p>
                          <p className="text-lg font-semibold text-white">45 min</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Range</p>
                          <p className="text-lg font-semibold text-white">315 miles</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'billing' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Billing & Payment</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-semibold">•••• •••• •••• 4242</p>
                            <p className="text-gray-400 text-sm">Expires 12/25</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="glass-card p-6">
                        <h3 className="font-semibold text-white mb-4">Current Balance</h3>
                        <div className="text-3xl font-bold text-green-400 mb-2">$127.50</div>
                        <p className="text-gray-400 text-sm">Available for charging</p>
                        <Button variant="gradient" size="sm" className="mt-4">
                          Add Funds
                        </Button>
                      </div>

                      <div className="glass-card p-6">
                        <h3 className="font-semibold text-white mb-4">This Month</h3>
                        <div className="text-3xl font-bold text-white mb-2">$89.32</div>
                        <p className="text-gray-400 text-sm">Total spent</p>
                        <Button variant="ghost" size="sm" className="mt-4">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    {[
                      { label: 'Charging session completed', description: 'Get notified when your vehicle is fully charged' },
                      { label: 'Low battery alerts', description: 'Receive alerts when your vehicle battery is low' },
                      { label: 'Nearby station updates', description: 'Get notified about new charging stations near you' },
                      { label: 'Promotional offers', description: 'Receive exclusive deals and discounts' },
                      { label: 'Weekly usage reports', description: 'Get weekly summaries of your charging activity' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div>
                          <p className="text-white font-medium">{item.label}</p>
                          <p className="text-gray-400 text-sm">{item.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked={index < 3} />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Security Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="glass-card p-6">
                      <h3 className="font-semibold text-white mb-4">Password</h3>
                      <p className="text-gray-400 text-sm mb-4">Last changed 3 months ago</p>
                      <Button variant="ghost">Change Password</Button>
                    </div>

                    <div className="glass-card p-6">
                      <h3 className="font-semibold text-white mb-4">Two-Factor Authentication</h3>
                      <p className="text-gray-400 text-sm mb-4">Add an extra layer of security to your account</p>
                      <Button variant="gradient">Enable 2FA</Button>
                    </div>

                    <div className="glass-card p-6">
                      <h3 className="font-semibold text-white mb-4">Active Sessions</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div>
                            <p className="text-white font-medium">MacBook Pro - Chrome</p>
                            <p className="text-gray-400 text-sm">San Francisco, CA • Current session</p>
                          </div>
                          <span className="text-green-400 text-sm">Active</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div>
                            <p className="text-white font-medium">iPhone 14 - Safari</p>
                            <p className="text-gray-400 text-sm">San Francisco, CA • 2 hours ago</p>
                          </div>
                          <Button variant="ghost" size="sm">Revoke</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
