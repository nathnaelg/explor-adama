import api from './api';
import { CONFIG } from '../constants/config';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  };
  images: string[];
  likes: number;
  comments: number;
  isLiked: boolean;
  tags: string[];
  category: string;
  readTime: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  likes: number;
  isLiked: boolean;
  createdAt: string;
  replies?: Comment[];
}

export interface CreatePostData {
  title: string;
  content: string;
  images: string[];
  tags: string[];
  category: string;
}

export const blogService = {
  // Get all blog posts
  async getPosts(page: number = 1, limit: number = 10, category?: string): Promise<{
    success: boolean;
    data: BlogPost[];
    pagination: any;
  }> {
    const params: any = { page, limit };
    if (category) params.category = category;
    
    const response = await api.get(CONFIG.ENDPOINTS.BLOG.POSTS, { params });
    return response.data;
  },

  // Get featured posts
  async getFeaturedPosts(): Promise<{ success: boolean; data: BlogPost[] }> {
    const response = await api.get(`${CONFIG.ENDPOINTS.BLOG.POSTS}/featured`);
    return response.data;
  },

  // Get post details
  async getPost(postId: string): Promise<{ success: boolean; data: BlogPost }> {
    const response = await api.get(`${CONFIG.ENDPOINTS.BLOG.DETAIL}/${postId}`);
    return response.data;
  },

  // Create new post
  async createPost(postData: CreatePostData): Promise<{ success: boolean; data: BlogPost }> {
    const response = await api.post(CONFIG.ENDPOINTS.BLOG.CREATE, postData);
    return response.data;
  },

  // Update post
  async updatePost(postId: string, postData: Partial<CreatePostData>): Promise<{ success: boolean; data: BlogPost }> {
    const response = await api.put(`${CONFIG.ENDPOINTS.BLOG.DETAIL}/${postId}`, postData);
    return response.data;
  },

  // Delete post
  async deletePost(postId: string): Promise<{ success: boolean }> {
    const response = await api.delete(`${CONFIG.ENDPOINTS.BLOG.DETAIL}/${postId}`);
    return response.data;
  },

  // Like/unlike post
  async likePost(postId: string): Promise<{ success: boolean; data: { likes: number; isLiked: boolean } }> {
    const response = await api.post(`${CONFIG.ENDPOINTS.BLOG.LIKES}/${postId}`);
    return response.data;
  },

  // Get post comments
  async getComments(postId: string): Promise<{ success: boolean; data: Comment[] }> {
    const response = await api.get(`${CONFIG.ENDPOINTS.BLOG.COMMENTS}/${postId}`);
    return response.data;
  },

  // Add comment
  async addComment(postId: string, content: string): Promise<{ success: boolean; data: Comment }> {
    const response = await api.post(`${CONFIG.ENDPOINTS.BLOG.COMMENTS}/${postId}`, { content });
    return response.data;
  },

  // Like comment
  async likeComment(commentId: string): Promise<{ success: boolean }> {
    const response = await api.post(`${CONFIG.ENDPOINTS.BLOG.COMMENTS}/${commentId}/like`);
    return response.data;
  },
};