import { createContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [admin, setAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const url = "http://localhost:4000/api";

  // Check if admin is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await axios.get(`${url}/admin/verify`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setAdmin(response.data.admin);
        setIsAuthenticated(true);
      }
    } catch (error) {
      localStorage.removeItem('admin_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${url}/admin/login`, {
        email,
        password
      });

      if (response.data.success) {
        const { token, admin } = response.data;
        localStorage.setItem('admin_token', token);
        setAdmin(admin);
        setIsAuthenticated(true);
        toast.success('Login successful!');
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setAdmin(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await axios.post(
        `${url}/admin/change-password`,
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success('Password changed successfully');
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password');
      return false;
    }
  };

  const value = {
    admin,
    isAuthenticated,
    loading,
    login,
    logout,
    changePassword,
    url
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
