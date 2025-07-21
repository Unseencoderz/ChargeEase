import { useState, useEffect, createContext, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User, LoginForm, SignupForm } from '../types';
import { authService, userService } from '../services/api';
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
  const queryClient = useQueryClient();

  // Check for existing token on app start
  useEffect(() => {
    const token = storage.get<string>(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      setIsAuthenticated(true);
      // Fetch user profile if token exists
      userService.getProfile()
        .then(userData => {
          setUser(userData);
        })
        .catch(() => {
          // Token might be invalid, clear it
          storage.remove(STORAGE_KEYS.AUTH_TOKEN);
          setIsAuthenticated(false);
        });
    }
  }, []);

  // User profile query
  const { 
    data: userData, 
    isLoading: isUserLoading,
    refetch: refetchUser 
  } = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: userService.getProfile,
    enabled: isAuthenticated,
    onSuccess: (data) => {
      setUser(data);
    },
    onError: () => {
      // If profile fetch fails, user might be logged out
      setIsAuthenticated(false);
      setUser(null);
      storage.remove(STORAGE_KEYS.AUTH_TOKEN);
    }
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setUser(data.user);
      setIsAuthenticated(true);
      storage.set(STORAGE_KEYS.AUTH_TOKEN, data.token);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      console.error('Login failed:', error);
      throw error;
    }
  });

  // Signup mutation
  const signupMutation = useMutation({
    mutationFn: authService.signup,
    onSuccess: (data) => {
      setUser(data.user);
      setIsAuthenticated(true);
      storage.set(STORAGE_KEYS.AUTH_TOKEN, data.token);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      console.error('Signup failed:', error);
      throw error;
    }
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      setUser(null);
      setIsAuthenticated(false);
      storage.remove(STORAGE_KEYS.AUTH_TOKEN);
      storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
      queryClient.clear();
    },
    onError: (error) => {
      // Even if logout fails on server, clear local state
      console.error('Logout error:', error);
      setUser(null);
      setIsAuthenticated(false);
      storage.remove(STORAGE_KEYS.AUTH_TOKEN);
      storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
      queryClient.clear();
    }
  });

  const login = async (credentials: LoginForm) => {
    await loginMutation.mutateAsync(credentials);
  };

  const signup = async (userData: SignupForm) => {
    await signupMutation.mutateAsync(userData);
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  const refreshUser = async () => {
    await refetchUser();
  };

  const isLoading = isUserLoading || loginMutation.isPending || signupMutation.isPending || logoutMutation.isPending;

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