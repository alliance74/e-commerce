
import { api } from '@/lib/api';

export interface User {
  email: string;
  isAdmin: boolean;
}

export class AuthService {
  // Login method
  static async login(email: string, password: string): Promise<{ success: boolean; token?: string; error?: string }> {
    try {
      return await api.login(email, password);
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    }
  }

  // Register method
  static async register(email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> {
    try {
      return await api.register(email, password, name);
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    }
  }

  // Check if user is logged in based on stored token
  static isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Get user data from localStorage
  static getCurrentUser(): User | null {
    const userString = localStorage.getItem('user');
    if (!userString) return null;
    
    try {
      return JSON.parse(userString);
    } catch (e) {
      console.error('Failed to parse user data:', e);
      return null;
    }
  }

  // Logout user by clearing storage
  static logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
}
