import api from './api';
import { CONFIG } from '../constants/config';

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images: string[];
  category: string;
  categoryId: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  minDeliveryTime: number;
  maxDeliveryTime: number;
  isFeatured: boolean;
  isOpen: boolean;
  tags: string[];
  address: string;
  latitude: number;
  longitude: number;
  openingHours: {
    open: string;
    close: string;
    isOpen: boolean;
  };
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
  color: string;
  serviceCount: number;
  isActive: boolean;
}

export interface ServicesResponse {
  success: boolean;
  data: Service[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface CategoriesResponse {
  success: boolean;
  data: Category[];
}

export const servicesService = {
  // Get all categories
  async getCategories(): Promise<CategoriesResponse> {
    const response = await api.get(CONFIG.ENDPOINTS.SERVICES.CATEGORIES);
    return response.data;
  },

  // Get featured services
  async getFeaturedServices(): Promise<ServicesResponse> {
    const response = await api.get(CONFIG.ENDPOINTS.SERVICES.FEATURED);
    return response.data;
  },

  // Get nearby services
  async getNearbyServices(latitude: number, longitude: number, radius: number = 10): Promise<ServicesResponse> {
    const response = await api.get(CONFIG.ENDPOINTS.SERVICES.NEARBY, {
      params: { latitude, longitude, radius }
    });
    return response.data;
  },

  // Search services
  async searchServices(query: string, categoryId?: string): Promise<ServicesResponse> {
    const params: any = { q: query };
    if (categoryId) params.category = categoryId;
    
    const response = await api.get(CONFIG.ENDPOINTS.SERVICES.SEARCH, { params });
    return response.data;
  },

  // Get services by category
  async getServicesByCategory(categoryId: string, page: number = 1, limit: number = 20): Promise<ServicesResponse> {
    const response = await api.get(`${CONFIG.ENDPOINTS.SERVICES.BY_CATEGORY}/${categoryId}`, {
      params: { page, limit }
    });
    return response.data;
  },

  // Get service details
  async getServiceDetails(serviceId: string): Promise<{ success: boolean; data: Service }> {
    const response = await api.get(`${CONFIG.ENDPOINTS.SERVICES.SERVICES}/${serviceId}`);
    return response.data;
  },

  // Get service reviews
  async getServiceReviews(serviceId: string): Promise<any> {
    const response = await api.get(`${CONFIG.ENDPOINTS.SERVICES.SERVICES}/${serviceId}/reviews`);
    return response.data;
  },
};