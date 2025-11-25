import api from './api';
import { CONFIG } from '../constants/config';

export interface Event {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  images: string[];
  date: string;
  time: string;
  endDate?: string;
  endTime?: string;
  location: {
    venue: string;
    address: string;
    city: string;
    latitude: number;
    longitude: number;
  };
  price: number;
  category: string;
  availableTickets: number;
  totalTickets: number;
  isFeatured: boolean;
  isActive: boolean;
  organizer: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
  };
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BookingData {
  eventId: string;
  tickets: number;
  specialRequests?: string;
  paymentMethod: string;
}

export interface Booking {
  id: string;
  event: Event;
  tickets: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  bookingDate: string;
  qrCode?: string;
}

export const eventsService = {
  // Get all events
  async getEvents(page: number = 1, limit: number = 10, category?: string): Promise<{
    success: boolean;
    data: Event[];
    pagination: any;
  }> {
    const params: any = { page, limit };
    if (category) params.category = category;
    
    const response = await api.get(CONFIG.ENDPOINTS.EVENTS.LIST, { params });
    return response.data;
  },

  // Get event details
  async getEvent(eventId: string): Promise<{ success: boolean; data: Event }> {
    const response = await api.get(`${CONFIG.ENDPOINTS.EVENTS.DETAIL}/${eventId}`);
    return response.data;
  },

  // Book event
  async bookEvent(bookingData: BookingData): Promise<{ success: boolean; data: Booking }> {
    const response = await api.post(CONFIG.ENDPOINTS.EVENTS.BOOK, bookingData);
    return response.data;
  },

  // Get user bookings
  async getUserBookings(): Promise<{ success: boolean; data: Booking[] }> {
    const response = await api.get(CONFIG.ENDPOINTS.EVENTS.TICKETS);
    return response.data;
  },

  // Cancel booking
  async cancelBooking(bookingId: string): Promise<{ success: boolean }> {
    const response = await api.delete(`${CONFIG.ENDPOINTS.EVENTS.TICKETS}/${bookingId}`);
    return response.data;
  },
};