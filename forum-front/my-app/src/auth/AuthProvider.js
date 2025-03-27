import React, { createContext, useContext, useState, useEffect } from 'react';
import { initKeycloak, getKeycloak } from '../api/keycloak';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [keycloak, setKeycloak] = useState(null);

  useEffect(() => {
    const keycloakInstance = getKeycloak();
    setKeycloak(keycloakInstance);
    
    initKeycloak(() => {
      setAuthenticated(true);
    });
  }, []);

  const login = () => {
    if (keycloak) {
      keycloak.login();
    }
  };

  const logout = () => {
    if (keycloak) {
      keycloak.logout();
    }
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
