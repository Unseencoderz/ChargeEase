import { useState, useEffect, createContext, useContext } from 'react';
import { User, LoginForm, SignupForm } from '../types';
import { storage } from '../utils/helpers';
import { STORAGE_KEYS, SUCCESS_MESSAGES } from '../utils/constants';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginForm) => Promise<void>;
  signup: (userData: SignupForm) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing auth on app start
  useEffect(() => {
    const token = storage.get<string>(STORAGE_KEYS.AUTH_TOKEN);
    const userData = storage.get<User>('chargeease_user');
    
    if (token && userData) {
      setUser(userData);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginForm) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Accept any email/password combination
    const mockUser: User = {
      id: '1',
      email: credentials.email,
      name: credentials.email.split('@')[0], // Use email prefix as name
      phone: '+1234567890',
      vehicles: [
        {
          id: '1',
          make: 'Tesla',
          model: 'Model 3',
          year: 2023,
          batteryCapacity: 75,
          connectorTypes: ['CCS', 'Tesla'],
          estimatedRange: 300,
          isDefault: true,
        }
      ],
      preferences: {
        units: 'imperial',
        language: 'en',
        notifications: {
          email: true,
          push: true,
          sms: false,
        },
      },
      membershipLevel: 'Free',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Store user data and token
    const mockToken = 'mock-jwt-token-' + Date.now();
    storage.set(STORAGE_KEYS.AUTH_TOKEN, mockToken);
    storage.set('chargeease_user', mockUser);
    
    setUser(mockUser);
    setIsAuthenticated(true);
    setIsLoading(false);
  };

  const signup = async (userData: SignupForm) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Accept any signup data
    const mockUser: User = {
      id: '1',
      email: userData.email,
      name: userData.name,
      phone: userData.phone,
      vehicles: [],
      preferences: {
        units: 'imperial',
        language: 'en',
        notifications: {
          email: true,
          push: true,
          sms: false,
        },
      },
      membershipLevel: 'Free',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Store user data and token
    const mockToken = 'mock-jwt-token-' + Date.now();
    storage.set(STORAGE_KEYS.AUTH_TOKEN, mockToken);
    storage.set('chargeease_user', mockUser);
    
    setUser(mockUser);
    setIsAuthenticated(true);
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setUser(null);
    setIsAuthenticated(false);
    storage.remove(STORAGE_KEYS.AUTH_TOKEN);
    storage.remove('chargeease_user');
    setIsLoading(false);
  };

  const refreshUser = async () => {
    // For now, just return the current user
    return;
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    refreshUser,
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};