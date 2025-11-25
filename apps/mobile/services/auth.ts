import api from './api';
import { CONFIG } from '../constants/config';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: any;
    token: string;
  };
  message?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const authService = {
  // Login user
  async login(credentials: LoginData): Promise<AuthResponse> {
    const response = await api.post(CONFIG.ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  },

  // Register new user
  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await api.post(CONFIG.ENDPOINTS.AUTH.REGISTER, userData);
    return response.data;
  },

  // Get user profile
  async getProfile(): Promise<ApiResponse<any>> {
    const response = await api.get(CONFIG.ENDPOINTS.AUTH.PROFILE);
    return response.data;
  },

  // Update user profile
  async updateProfile(profileData: any): Promise<ApiResponse<any>> {
    const response = await api.put(CONFIG.ENDPOINTS.AUTH.PROFILE, profileData);
    return response.data;
  },

  // Forgot password
  async forgotPassword(email: string): Promise<ApiResponse<any>> {
    const response = await api.post(CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    return response.data;
  },

  // Reset password
  async resetPassword(token: string, password: string): Promise<ApiResponse<any>> {
    const response = await api.post(CONFIG.ENDPOINTS.AUTH.RESET_PASSWORD, { 
      token, 
      password 
    });
    return response.data;
  },

  // Logout user
  async logout(): Promise<ApiResponse<any>> {
    const response = await api.post(CONFIG.ENDPOINTS.AUTH.LOGOUT);
    return response.data;
  },
};