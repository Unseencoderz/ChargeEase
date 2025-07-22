
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Car,
  Settings,
  Bell,
  Shield,
  CreditCard,
  Edit,
  Save,
  X,
  Plus,
  Trash2
} from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../hooks/useAuth';
import { Vehicle } from '../types';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'vehicles' | 'preferences' | 'security'>('profile');
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || ''
    }
  });

  const onSubmit = async (data: any) => {
    console.log('Profile updated:', data);
    setIsEditing(false);
    // Here you would call the API to update the profile
  };

  const ProfileSection = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Personal Information
        </h2>
        {!isEditing && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              {...register('name', { required: 'Name is required' })}
              label="Full Name"
              placeholder="Enter your full name"
              leftIcon={<User className="w-4 h-4" />}
              error={errors.name?.message}
              variant="outlined"
            />
            
            <Input
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]@[^\s@]\.[^\s@]$/,
                  message: 'Please enter a valid email address'
                }
              })}
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              leftIcon={<Mail className="w-4 h-4" />}
              error={errors.email?.message}
              variant="outlined"
            />
            
            <Input
              {...register('phone')}
              type="tel"
              label="Phone Number"
              placeholder="Enter your phone number"
              leftIcon={<Phone className="w-4 h-4" />}
              variant="outlined"
            />
          </div>

          <div className="flex space-x-3">
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => {
                setIsEditing(false);
                reset();
              }}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <p className="text-gray-900 dark:text-white">{user?.name}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <p className="text-gray-900 dark:text-white">{user?.email}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number
              </label>
              <p className="text-gray-900 dark:text-white">{user?.phone || 'Not provided'}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Member Since
              </label>
              <p className="text-gray-900 dark:text-white">
                {new Date(user?.createdAt || '').toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const VehiclesSection = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>(user?.vehicles || []);
    const [showAddForm, setShowAddForm] = useState(false);

    const VehicleCard: React.FC<{ vehicle: Vehicle; onDelete: () => void }> = ({ vehicle, onDelete }) => (
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h3>
            {vehicle.isDefault && (
              <span className="inline-block px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400 rounded-full mt-1">
                Default
              </span>
            )}
          </div>
          <button 
            onClick={onDelete}
            className="text-gray-400 hover:text-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div>
            <span className="font-medium">Battery:</span> {vehicle.batteryCapacity} kWh
          </div>
          <div>
            <span className="font-medium">Range:</span> {vehicle.estimatedRange} miles
          </div>
          <div className="col-span-2">
            <span className="font-medium">Connectors:</span> {vehicle.connectorTypes.join(', ')}
          </div>
        </div>
      </div>
    );

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            My Vehicles
          </h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowAddForm(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Vehicle
          </Button>
        </div>

        <div className="space-y-4">
          {vehicles.map((vehicle) => (
            <VehicleCard 
              key={vehicle.id} 
              vehicle={vehicle}
              onDelete={() => {
                setVehicles(vehicles.filter(v => v.id !== vehicle.id));
              }}
            />
          ))}
          
          {vehicles.length === 0 && (
            <div className="text-center py-8">
              <Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No vehicles added
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Add your electric vehicle to get personalized recommendations.
              </p>
            </div>
          )}
        </div>

        {showAddForm && (
          <div className="mt-6 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Add New Vehicle
            </h3>
            {/* Add vehicle form would go here */}
            <div className="flex space-x-3">
              <Button size="sm">Add Vehicle</Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const PreferencesSection = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Preferences
      </h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Units
          </h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input 
                type="radio" 
                name="units" 
                value="imperial"
                defaultChecked={user?.preferences?.units === 'imperial'}
                className="text-orange-600 focus:ring-orange-500"
              />
              <span className="ml-3 text-gray-900 dark:text-white">Imperial (miles, °F)</span>
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="units" 
                value="metric"
                defaultChecked={user?.preferences?.units === 'metric'}
                className="text-orange-600 focus:ring-orange-500"
              />
              <span className="ml-3 text-gray-900 dark:text-white">Metric (km, °C)</span>
            </label>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Notifications
          </h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                defaultChecked={user?.preferences?.notifications?.email}
                className="text-orange-600 focus:ring-orange-500 rounded"
              />
              <span className="ml-3 text-gray-900 dark:text-white">Email notifications</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                defaultChecked={user?.preferences?.notifications?.push}
                className="text-orange-600 focus:ring-orange-500 rounded"
              />
              <span className="ml-3 text-gray-900 dark:text-white">Push notifications</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                defaultChecked={user?.preferences?.notifications?.sms}
                className="text-orange-600 focus:ring-orange-500 rounded"
              />
              <span className="ml-3 text-gray-900 dark:text-white">SMS notifications</span>
            </label>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button>Save Preferences</Button>
      </div>
    </div>
  );

  const SecuritySection = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Security Settings
        </h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Change Password
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Update your password to keep your account secure.
            </p>
            <Button variant="outline">Change Password</Button>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Two-Factor Authentication
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Add an extra layer of security to your account.
            </p>
            <Button variant="outline">Enable 2FA</Button>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Account Actions
        </h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Download Data
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Download a copy of your account data.
            </p>
            <Button variant="outline">Download Data</Button>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
            <h3 className="text-lg font-medium text-red-600 mb-2">
              Delete Account
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Permanently delete your account and all associated data.
            </p>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'vehicles', label: 'Vehicles', icon: Car },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Profile Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your account settings and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              {/* Profile Summary */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {user?.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {user?.membershipLevel} Member
                </p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'profile' && <ProfileSection />}
              {activeTab === 'vehicles' && <VehiclesSection />}
              {activeTab === 'preferences' && <PreferencesSection />}
              {activeTab === 'security' && <SecuritySection />}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
