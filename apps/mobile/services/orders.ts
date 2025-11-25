import api from './api';
import { CONFIG } from '../constants/config';

export interface OrderItem {
  id: string;
  serviceId: string;
  serviceName: string;
  serviceImage: string;
  quantity: number;
  price: number;
  specialInstructions?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  tax: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: string;
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    latitude: number;
    longitude: number;
    instructions?: string;
  };
  restaurant: {
    id: string;
    name: string;
    image: string;
    phone: string;
  };
  customer: {
    id: string;
    name: string;
    phone: string;
    email: string;
  };
  driver?: {
    id: string;
    name: string;
    phone: string;
    vehicle: string;
    licensePlate: string;
    rating: number;
  };
  estimatedDelivery: string;
  actualDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderData {
  items: Array<{
    serviceId: string;
    quantity: number;
    specialInstructions?: string;
  }>;
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    latitude: number;
    longitude: number;
    instructions?: string;
  };
  paymentMethod: string;
  specialInstructions?: string;
}

export const ordersService = {
  // Create new order
  async createOrder(orderData: CreateOrderData): Promise<{ success: boolean; data: Order }> {
    const response = await api.post(CONFIG.ENDPOINTS.ORDERS.CREATE, orderData);
    return response.data;
  },

  // Get user orders
  async getOrders(page: number = 1, limit: number = 10, status?: string): Promise<{ 
    success: boolean; 
    data: Order[];
    pagination: any;
  }> {
    const params: any = { page, limit };
    if (status) params.status = status;
    
    const response = await api.get(CONFIG.ENDPOINTS.ORDERS.LIST, { params });
    return response.data;
  },

  // Get order details
  async getOrderDetails(orderId: string): Promise<{ success: boolean; data: Order }> {
    const response = await api.get(`${CONFIG.ENDPOINTS.ORDERS.DETAIL}/${orderId}`);
    return response.data;
  },

  // Track order
  async trackOrder(orderId: string): Promise<{ 
    success: boolean; 
    data: {
      order: Order;
      tracking: {
        status: string;
        location?: {
          latitude: number;
          longitude: number;
          address: string;
        };
        estimatedArrival: string;
        driver?: {
          name: string;
          phone: string;
          vehicle: string;
          licensePlate: string;
        };
      };
    };
  }> {
    const response = await api.get(`${CONFIG.ENDPOINTS.ORDERS.TRACK}/${orderId}`);
    return response.data;
  },

  // Cancel order
  async cancelOrder(orderId: string, reason?: string): Promise<{ success: boolean; data: Order }> {
    const response = await api.post(`${CONFIG.ENDPOINTS.ORDERS.CANCEL}/${orderId}`, { reason });
    return response.data;
  },

  // Rate order
  async rateOrder(orderId: string, rating: number, comment?: string): Promise<{ success: boolean }> {
    const response = await api.post(`${CONFIG.ENDPOINTS.ORDERS.DETAIL}/${orderId}/rate`, {
      rating,
      comment
    });
    return response.data;
  },
};