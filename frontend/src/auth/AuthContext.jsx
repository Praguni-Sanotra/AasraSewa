import React, { createContext, useContext, useEffect, useState } from "react";
import apiService from "../services/api.js";

const AuthContext = createContext({
  isAuthenticated: null,
  loading: true,
  user: null,
  login: () => {},
  logout: () => {},
  register: () => {},
  refreshAuth: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    try {
      const response = await apiService.login(credentials);
      setIsAuthenticated(true);
      setUser(response.user);
      return { success: true, data: response };
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await apiService.register(userData);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
      setIsAuthenticated(false);
      setUser(null);
      return { success: true };
    } catch (error) {
      // Even if logout fails, clear local state
      setIsAuthenticated(false);
      setUser(null);
      return { success: false, error: error.message };
    }
  };

  const refreshAuth = async () => {
    try {
      setLoading(true);
      const authResult = await apiService.checkAuth();
      setIsAuthenticated(authResult.isAuthenticated);
      setUser(authResult.user || null);
    } catch (error) {
      console.error('Auth refresh error:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        loading, 
        user,
        login,
        logout,
        register,
        refreshAuth 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
