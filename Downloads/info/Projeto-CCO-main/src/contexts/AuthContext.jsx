import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadStorageData = () => {
      const storedUser = localStorage.getItem('@SistemaCCO:user');
      const storedToken = localStorage.getItem('@SistemaCCO:token');

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      }

      setLoading(false);
    };

    loadStorageData();
  }, []);

  const signIn = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      const { user, token } = response.data;

      localStorage.setItem('@SistemaCCO:user', JSON.stringify(user));
      localStorage.setItem('@SistemaCCO:token', token);

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUser(user);
      navigate('/');
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erro ao fazer login' 
      };
    }
  };

  const signOut = () => {
    localStorage.removeItem('@SistemaCCO:user');
    localStorage.removeItem('@SistemaCCO:token');
    
    delete api.defaults.headers.common['Authorization'];
    
    setUser(null);
    navigate('/login');
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('@SistemaCCO:user', JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
