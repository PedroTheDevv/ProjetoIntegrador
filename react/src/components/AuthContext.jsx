import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');
    return !!token;
  });

  const [username, setUsername] = useState(() => {
    return localStorage.getItem('username') || '';
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') || '';
  });

  const login = (token, user, isAdmin) => {
    const expirationTime = new Date().getTime() + 3600000;
    localStorage.setItem('token', token);
    localStorage.setItem('username', user);
    localStorage.setItem('isAdmin', isAdmin);
    localStorage.setItem('expirationTime', expirationTime);
    setIsAuthenticated(true);
    setUsername(user);
    setIsAdmin(isAdmin);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
    setIsAuthenticated(false);
    setUsername('');
    setIsAdmin(false);
  };

  const checkTokenExpiration = () => {
    const expirationTime = localStorage.getItem('expirationTime');
    const currentTime = new Date().getTime();
    if (currentTime > expirationTime) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('expirationTime');
      return false;
    }
    return true;
  };

  useEffect(() => {
    const isTokenValid = checkTokenExpiration();
    if (!isTokenValid) {
      setIsAuthenticated(false);
      setUsername('');
      setIsAdmin(false);
      console.log('Sessão expirada. Faça login novamente.');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
