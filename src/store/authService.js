'use client';
import axios from 'axios';

const USER_STORAGE_KEY = 'auth_user';

const API_HEADERS = {
  "Cache-Control": "no-store, no-cache",
  Pragma: "no-cache",
  Expires: "0",
};

export const authService = {
  // Store user data in localStorage
  persistUserData(userData) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    }
  },

  // Get stored user data
  getStoredUserData() {
    if (typeof window !== 'undefined') {
      try {
        const userData = localStorage.getItem(USER_STORAGE_KEY);
        return userData ? JSON.parse(userData) : null;
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        return null;
      }
    }
    return null;
  },

  // Clear stored user data
  clearStoredUserData() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  },

  async checkUserAuth() {
    try {
      const response = await axios.get('/api/auth/get-token', {
        headers: API_HEADERS,
      });
      
      if (response.data.user) {
        this.persistUserData(response.data.user);
      } else {
        this.clearStoredUserData();
      }
      
      return response.data;
    } catch (error) {
      console.error('Authentication check failed:', error);
      this.clearStoredUserData();
      throw error;
    }
  },

  async logoutUser() {
    try {
      await axios.get('/api/auth/logout');
      this.clearStoredUserData();
      return true;
    } catch (error) {
      console.error('Logout failed:', error);
      this.clearStoredUserData();
      throw error;
    }
  }
};