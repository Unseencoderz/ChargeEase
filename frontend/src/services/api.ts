import { 
  ChargingStation, 
  SearchFilters, 
  SearchResult, 
  User, 
  Booking, 
  Review,
  UserAnalytics,
  ApiResponse,
  LoginForm,
  SignupForm
} from '../types';
import { API_BASE_URL } from '../utils/constants';

// Base API client
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('chargeease_auth_token');
    if (token && config.headers) {
      (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

const apiClient = new ApiClient(API_BASE_URL);

// Authentication services
export const authService = {
  async login(credentials: LoginForm): Promise<{ user: User; token: string }> {
    const response = await apiClient.post<{ user: User; token: string }>('/auth/login', credentials);
    
    if (response.success && response.data.token) {
      localStorage.setItem('chargeease_auth_token', response.data.token);
    }
    
    return response.data;
  },

  async signup(userData: SignupForm): Promise<{ user: User; token: string }> {
    const response = await apiClient.post<{ user: User; token: string }>('/auth/signup', userData);
    
    if (response.success && response.data.token) {
      localStorage.setItem('chargeease_auth_token', response.data.token);
    }
    
    return response.data;
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      localStorage.removeItem('chargeease_auth_token');
      localStorage.removeItem('chargeease_refresh_token');
    }
  },

  async refreshToken(): Promise<{ token: string }> {
    const refreshToken = localStorage.getItem('chargeease_refresh_token');
    const response = await apiClient.post<{ token: string }>('/auth/refresh', { refreshToken });
    
    if (response.success && response.data.token) {
      localStorage.setItem('chargeease_auth_token', response.data.token);
    }
    
    return response.data;
  },

  async forgotPassword(email: string): Promise<void> {
    await apiClient.post('/auth/forgot-password', { email });
  },

  async resetPassword(token: string, password: string): Promise<void> {
    await apiClient.post('/auth/reset-password', { token, password });
  },

  async verifyEmail(token: string): Promise<void> {
    await apiClient.post('/auth/verify-email', { token });
  },
};

// User services
export const userService = {
  async getProfile(): Promise<User> {
    const response = await apiClient.get<User>('/users/profile');
    return response.data;
  },

  async updateProfile(userData: Partial<User>): Promise<User> {
    const response = await apiClient.put<User>('/users/profile', userData);
    return response.data;
  },

  async uploadAvatar(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('avatar', file);
    
    const response = await fetch(`${API_BASE_URL}/users/avatar`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('chargeease_auth_token')}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Upload failed');
    }

    return data.data;
  },

  async deleteAccount(): Promise<void> {
    await apiClient.delete('/users/profile');
    localStorage.clear();
  },

  async getAnalytics(): Promise<UserAnalytics> {
    const response = await apiClient.get<UserAnalytics>('/users/analytics');
    return response.data;
  },
};

// Charging station services
export const stationService = {
  async searchStations(filters: SearchFilters, page = 1, limit = 20): Promise<SearchResult> {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (filters.location) {
      queryParams.append('lat', filters.location.latitude.toString());
      queryParams.append('lng', filters.location.longitude.toString());
      queryParams.append('radius', filters.location.radius.toString());
    }

    if (filters.chargingSpeed) {
      filters.chargingSpeed.forEach(speed => queryParams.append('chargingSpeed', speed));
    }

    if (filters.connectorTypes) {
      filters.connectorTypes.forEach(type => queryParams.append('connectorType', type));
    }

    if (filters.amenities) {
      filters.amenities.forEach(amenity => queryParams.append('amenity', amenity));
    }

    if (filters.availability !== undefined) {
      queryParams.append('availability', filters.availability.toString());
    }

    if (filters.rating) {
      queryParams.append('rating', filters.rating.toString());
    }

    if (filters.hostTypes) {
      filters.hostTypes.forEach(type => queryParams.append('hostType', type));
    }

    if (filters.priceRange) {
      queryParams.append('minPrice', filters.priceRange.min.toString());
      queryParams.append('maxPrice', filters.priceRange.max.toString());
    }

    const response = await apiClient.get<SearchResult>(`/stations?${queryParams.toString()}`);
    return response.data;
  },

  async getStationById(id: string): Promise<ChargingStation> {
    const response = await apiClient.get<ChargingStation>(`/stations/${id}`);
    return response.data;
  },

  async getStationReviews(stationId: string, page = 1, limit = 10): Promise<{ reviews: Review[]; total: number }> {
    const response = await apiClient.get<{ reviews: Review[]; total: number }>(`/stations/${stationId}/reviews?page=${page}&limit=${limit}`);
    return response.data;
  },

  async getNearbyStations(lat: number, lng: number, radius = 25): Promise<ChargingStation[]> {
    const response = await apiClient.get<ChargingStation[]>(`/stations/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
    return response.data;
  },

  async getPopularStations(): Promise<ChargingStation[]> {
    const response = await apiClient.get<ChargingStation[]>('/stations/popular');
    return response.data;
  },

  async getTopRatedStations(): Promise<ChargingStation[]> {
    const response = await apiClient.get<ChargingStation[]>('/stations/top-rated');
    return response.data;
  },

  async addToFavorites(stationId: string): Promise<void> {
    await apiClient.post(`/stations/${stationId}/favorite`);
  },

  async removeFromFavorites(stationId: string): Promise<void> {
    await apiClient.delete(`/stations/${stationId}/favorite`);
  },

  async getFavoriteStations(): Promise<ChargingStation[]> {
    const response = await apiClient.get<ChargingStation[]>('/users/favorites');
    return response.data;
  },

  async reportStation(stationId: string, reason: string, description?: string): Promise<void> {
    await apiClient.post(`/stations/${stationId}/report`, { reason, description });
  },
};

// Booking services
export const bookingService = {
  async createBooking(bookingData: {
    stationId: string;
    startTime: string;
    duration: number;
    connectorType: string;
  }): Promise<Booking> {
    const response = await apiClient.post<Booking>('/bookings', bookingData);
    return response.data;
  },

  async getBookings(status?: string, page = 1, limit = 10): Promise<{ bookings: Booking[]; total: number }> {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (status) {
      queryParams.append('status', status);
    }

    const response = await apiClient.get<{ bookings: Booking[]; total: number }>(`/bookings?${queryParams.toString()}`);
    return response.data;
  },

  async getBookingById(id: string): Promise<Booking> {
    const response = await apiClient.get<Booking>(`/bookings/${id}`);
    return response.data;
  },

  async cancelBooking(id: string): Promise<Booking> {
    const response = await apiClient.put<Booking>(`/bookings/${id}/cancel`);
    return response.data;
  },

  async extendBooking(id: string, additionalMinutes: number): Promise<Booking> {
    const response = await apiClient.put<Booking>(`/bookings/${id}/extend`, { additionalMinutes });
    return response.data;
  },

  async startCharging(id: string): Promise<Booking> {
    const response = await apiClient.put<Booking>(`/bookings/${id}/start`);
    return response.data;
  },

  async stopCharging(id: string): Promise<Booking> {
    const response = await apiClient.put<Booking>(`/bookings/${id}/stop`);
    return response.data;
  },

  async getBookingHistory(page = 1, limit = 20): Promise<{ bookings: Booking[]; total: number }> {
    const response = await apiClient.get<{ bookings: Booking[]; total: number }>(`/bookings/history?page=${page}&limit=${limit}`);
    return response.data;
  },
};

// Review services
export const reviewService = {
  async createReview(reviewData: {
    stationId: string;
    rating: number;
    title: string;
    comment: string;
    images?: File[];
  }): Promise<Review> {
    const formData = new FormData();
    formData.append('stationId', reviewData.stationId);
    formData.append('rating', reviewData.rating.toString());
    formData.append('title', reviewData.title);
    formData.append('comment', reviewData.comment);

    if (reviewData.images) {
      reviewData.images.forEach((image, index) => {
        formData.append(`images`, image);
      });
    }

    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('chargeease_auth_token')}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Review creation failed');
    }

    return data.data;
  },

  async updateReview(id: string, reviewData: Partial<Review>): Promise<Review> {
    const response = await apiClient.put<Review>(`/reviews/${id}`, reviewData);
    return response.data;
  },

  async deleteReview(id: string): Promise<void> {
    await apiClient.delete(`/reviews/${id}`);
  },

  async markReviewHelpful(id: string): Promise<void> {
    await apiClient.post(`/reviews/${id}/helpful`);
  },

  async getUserReviews(page = 1, limit = 10): Promise<{ reviews: Review[]; total: number }> {
    const response = await apiClient.get<{ reviews: Review[]; total: number }>(`/users/reviews?page=${page}&limit=${limit}`);
    return response.data;
  },
};

// Payment services
export const paymentService = {
  async getPaymentMethods(): Promise<any[]> {
    const response = await apiClient.get<any[]>('/payments/methods');
    return response.data;
  },

  async addPaymentMethod(paymentMethodData: any): Promise<any> {
    const response = await apiClient.post<any>('/payments/methods', paymentMethodData);
    return response.data;
  },

  async removePaymentMethod(id: string): Promise<void> {
    await apiClient.delete(`/payments/methods/${id}`);
  },

  async setDefaultPaymentMethod(id: string): Promise<void> {
    await apiClient.put(`/payments/methods/${id}/default`);
  },

  async createPaymentIntent(amount: number, currency = 'USD'): Promise<{ clientSecret: string }> {
    const response = await apiClient.post<{ clientSecret: string }>('/payments/intent', { amount, currency });
    return response.data;
  },

  async getInvoices(page = 1, limit = 20): Promise<{ invoices: any[]; total: number }> {
    const response = await apiClient.get<{ invoices: any[]; total: number }>(`/payments/invoices?page=${page}&limit=${limit}`);
    return response.data;
  },
};

// Notification services
export const notificationService = {
  async getNotifications(): Promise<any[]> {
    const response = await apiClient.get<any[]>('/notifications');
    return response.data;
  },

  async markAsRead(id: string): Promise<void> {
    await apiClient.put(`/notifications/${id}/read`);
  },

  async markAllAsRead(): Promise<void> {
    await apiClient.put('/notifications/read-all');
  },

  async deleteNotification(id: string): Promise<void> {
    await apiClient.delete(`/notifications/${id}`);
  },

  async updateSettings(settings: any): Promise<void> {
    await apiClient.put('/notifications/settings', settings);
  },
};

// Mock data service (for development)
export const mockDataService = {
  async getPopularDestinations(): Promise<any[]> {
    // This would be replaced with real API calls
    return [
      {
        id: '1',
        name: 'Downtown Shopping District',
        location: 'San Francisco, CA',
        stationCount: 15,
        image: '/api/placeholder/300/200',
        rating: 4.8,
      },
      {
        id: '2',
        name: 'Tech Hub Plaza',
        location: 'Austin, TX',
        stationCount: 22,
        image: '/api/placeholder/300/200',
        rating: 4.7,
      },
      {
        id: '3',
        name: 'Green Energy Center',
        location: 'Seattle, WA',
        stationCount: 18,
        image: '/api/placeholder/300/200',
        rating: 4.9,
      },
    ];
  },

  async getStatistics(): Promise<any> {
    return {
      totalStations: '1,250,000+',
      totalSessions: '50,000+',
      carbonSaved: '2.5M kg',
      activeUsers: '100,000+',
    };
  },
};

export default {
  auth: authService,
  user: userService,
  station: stationService,
  booking: bookingService,
  review: reviewService,
  payment: paymentService,
  notification: notificationService,
  mockData: mockDataService,
};