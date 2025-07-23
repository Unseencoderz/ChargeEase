import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User, LoginForm, SignupForm } from '../types';
// import { authService, userService } from '../services/api';
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
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  // Check for existing session on app start
  useEffect(() => {
    const savedUser = storage.get<User>(STORAGE_KEYS.USER_DATA);
    const token = storage.get<string>(STORAGE_KEYS.AUTH_TOKEN);
    
    if (savedUser && token) {
      setUser(savedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (credentials: LoginForm) => {
    setIsLoading(true);
    try {
      // MOCK LOGIN - Replace with actual API call when backend is ready
      /*
      // Real implementation when backend is ready:
      const response = await authService.login(credentials);
      const { user, token } = response;
      storage.set(STORAGE_KEYS.AUTH_TOKEN, token);
      storage.set(STORAGE_KEYS.USER_DATA, user);
      setUser(user);
      setIsAuthenticated(true);
      */
      
      // Mock implementation for frontend testing
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: credentials.email,
        phone: '+1 (555) 123-4567',
        avatar: null,
        membershipLevel: 'Premium',
        createdAt: new Date().toISOString(),
        vehicles: [],
        preferences: {
          units: 'imperial',
          notifications: {
            email: true,
            push: true,
            sms: false
          }
        }
      };
      
      const mockToken = 'mock_jwt_token_' + Date.now();
      
      // Save to localStorage for persistence
      storage.set(STORAGE_KEYS.AUTH_TOKEN, mockToken);
      storage.set(STORAGE_KEYS.USER_DATA, mockUser);
      
      setUser(mockUser);
      setIsAuthenticated(true);
      
      console.log('Mock login successful:', { user: mockUser, token: mockToken });
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: SignupForm) => {
    setIsLoading(true);
    try {
      // MOCK SIGNUP - Replace with actual API call when backend is ready
      /*
      // Real implementation when backend is ready:
      const response = await authService.signup(userData);
      const { user, token } = response;
      storage.set(STORAGE_KEYS.AUTH_TOKEN, token);
      storage.set(STORAGE_KEYS.USER_DATA, user);
      setUser(user);
      setIsAuthenticated(true);
      */
      
      // Mock implementation for frontend testing
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      
      const mockUser: User = {
        id: '2',
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        phone: userData.phone || '',
        avatar: null,
        membershipLevel: 'Basic',
        createdAt: new Date().toISOString(),
        vehicles: [],
        preferences: {
          units: 'imperial',
          notifications: {
            email: true,
            push: userData.newsletter || false,
            sms: false
          }
        }
      };
      
      const mockToken = 'mock_jwt_token_' + Date.now();
      
      // Save to localStorage for persistence
      storage.set(STORAGE_KEYS.AUTH_TOKEN, mockToken);
      storage.set(STORAGE_KEYS.USER_DATA, mockUser);
      
      setUser(mockUser);
      setIsAuthenticated(true);
      
      console.log('Mock signup successful:', { user: mockUser, token: mockToken });
    } catch (error) {
      console.error('Signup failed:', error);
      throw new Error('Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // MOCK LOGOUT - Replace with actual API call when backend is ready
      /*
      // Real implementation when backend is ready:
      await authService.logout();
      */
      
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Clear storage
      storage.remove(STORAGE_KEYS.AUTH_TOKEN);
      storage.remove(STORAGE_KEYS.USER_DATA);
      
      setUser(null);
      setIsAuthenticated(false);
      
      // Clear query cache
      queryClient.clear();
      
      console.log('Mock logout successful');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    try {
      // MOCK REFRESH - Replace with actual API call when backend is ready
      /*
      // Real implementation when backend is ready:
      const updatedUser = await userService.getProfile();
      setUser(updatedUser);
      storage.set(STORAGE_KEYS.USER_DATA, updatedUser);
      */
      
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const currentUser = storage.get<User>(STORAGE_KEYS.USER_DATA);
      if (currentUser) {
        setUser(currentUser);
      }
      
      console.log('Mock user refresh successful');
    } catch (error) {
      console.error('Failed to refresh user:', error);
      // If refresh fails, logout user
      await logout();
    } finally {
      setIsLoading(false);
    }
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

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuthProvider();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};
