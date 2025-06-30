import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Create axios instance with default config
const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true, // Include cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

class ApiService {
  // User Authentication
  async register(userData) {
    try {
      const response = await api.post('/api/v1/user/register', userData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Registration API error:', error.response?.data || error.message);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      };
    }
  }

  async login(credentials) {
    try {
      const response = await api.post('/api/v1/user/login', credentials);
      // Token is automatically stored in HTTP-only cookie by backend
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  }

  async getProfile() {
    try {
      const response = await api.get('/api/v1/user/profile');
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to get profile' 
      };
    }
  }

  async updateProfile(userData) {
    try {
      const response = await api.put('/api/v1/user/update', userData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update profile' 
      };
    }
  }

  async logout() {
    try {
      await api.post('/api/v1/user/logout');
      // Backend clears the HTTP-only cookie
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Logout failed' 
      };
    }
  }

  async checkAuth() {
    try {
      const response = await api.get('/api/v1/user/profile');
      return { 
        isAuthenticated: true, 
        user: response.data.user 
      };
    } catch (error) {
      return { isAuthenticated: false };
    }
  }

  // Property Management
  async getAllProperties(params = {}) {
    try {
      const response = await api.get('/api/v1/property/all', { params });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to get properties' 
      };
    }
  }

  async getPropertyById(id) {
    try {
      const response = await api.get(`/api/v1/property/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to get property' 
      };
    }
  }

  async getMyProperties() {
    try {
      const response = await api.get('/api/v1/property/my');
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to get your properties' 
      };
    }
  }

  async registerProperty(propertyData) {
    try {
      const response = await api.post('/api/v1/property/register', propertyData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to register property' 
      };
    }
  }

  async updateProperty(id, propertyData) {
    try {
      const response = await api.put(`/api/v1/property/update/${id}`, propertyData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update property' 
      };
    }
  }
}

export default new ApiService(); 