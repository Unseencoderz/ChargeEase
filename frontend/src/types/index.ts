// Core Types
export interface ChargingStation {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  rating: number;
  reviewCount: number;
  distance?: number;
  amenities: string[];
  connectorTypes: ConnectorType[];
  chargingSpeed: ChargingSpeed;
  pricing: Pricing;
  availability: StationAvailability;
  images: string[];
  operatingHours: OperatingHours;
  hostType: 'Tesla' | 'ChargePoint' | 'EVgo' | 'Electrify America' | 'Other';
}

export interface ConnectorType {
  type: 'J1772' | 'CCS' | 'CHAdeMO' | 'Tesla' | 'Type 2';
  maxPower: number; // in kW
  available: boolean;
  count: number;
}

export type ChargingSpeed = 'Level 1' | 'Level 2' | 'DC Fast' | 'Supercharger';

export interface Pricing {
  perKwh?: number;
  perMinute?: number;
  sessionFee?: number;
  currency: string;
}

export interface StationAvailability {
  status: 'Available' | 'Busy' | 'Out of Service' | 'Coming Soon';
  availableConnectors: number;
  totalConnectors: number;
  estimatedWaitTime?: number; // in minutes
}

export interface OperatingHours {
  isOpen24Hours: boolean;
  schedule?: {
    [key: string]: { // day of week
      open: string;
      close: string;
    };
  };
}

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  vehicles: Vehicle[];
  preferences: UserPreferences;
  membershipLevel: 'Free' | 'Premium' | 'Elite';
  createdAt: string;
  updatedAt: string;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  batteryCapacity: number; // in kWh
  connectorTypes: string[];
  estimatedRange: number; // in miles/km
  isDefault: boolean;
}

export interface UserPreferences {
  units: 'metric' | 'imperial';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  paymentMethod?: PaymentMethod;
}

// Booking Types
export interface Booking {
  id: string;
  userId: string;
  stationId: string;
  station: ChargingStation;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  connectorType: string;
  status: 'Pending' | 'Confirmed' | 'Active' | 'Completed' | 'Cancelled';
  totalCost: number;
  energyDelivered?: number; // in kWh
  createdAt: string;
  updatedAt: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'apple_pay' | 'google_pay';
  last4?: string;
  brand?: string;
  isDefault: boolean;
}

// Search Types
export interface SearchFilters {
  location?: {
    latitude: number;
    longitude: number;
    radius: number; // in miles/km
  };
  chargingSpeed?: ChargingSpeed[];
  connectorTypes?: string[];
  amenities?: string[];
  availability?: boolean;
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  hostTypes?: string[];
}

export interface SearchResult {
  stations: ChargingStation[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Analytics Types
export interface UserAnalytics {
  totalSessions: number;
  totalEnergyConsumed: number; // in kWh
  totalCost: number;
  carbonFootprintSaved: number; // in kg CO2
  favoriteStations: ChargingStation[];
  monthlyUsage: MonthlyUsage[];
}

export interface MonthlyUsage {
  month: string;
  sessions: number;
  energyConsumed: number;
  cost: number;
}

// Review Types
export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  stationId: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  helpful: number;
  createdAt: string;
  updatedAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  code: string;
  statusCode: number;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  agreeToTerms: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

// Map Types
export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface MapCenter {
  latitude: number;
  longitude: number;
  zoom: number;
}