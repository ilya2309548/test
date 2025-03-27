import React, { createContext, useContext, useState, useEffect } from 'react';
import { initKeycloak, getKeycloak } from '../api/keycloak';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [keycloak, setKeycloak] = useState(null);

  useEffect(() => {
    initKeycloak(() => {
      setAuthenticated(true);
      setKeycloak(getKeycloak());
    });
  }, []);

  const login = () => {
    keycloak.login();
  };

  const logout = () => {
    keycloak.logout();
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout, keycloak }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
