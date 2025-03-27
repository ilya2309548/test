import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080/',
  realm: 'forum',
  clientId: 'forum-client',
});

export const initKeycloak = (onAuthenticatedCallback) => {
  keycloak.init({
    onLoad: 'login-required',
    pkceMethod: 'S256',
    flow: 'standard',
  }).then((authenticated) => {
    if (authenticated) {
      localStorage.setItem('access_token', keycloak.token);
      localStorage.setItem('refresh_token', keycloak.refreshToken);
      keycloak.onTokenExpired = () => {
        keycloak.updateToken(30).then((refreshed) => {
          if (refreshed) {
            localStorage.setItem('access_token', keycloak.token);
            localStorage.setItem('refresh_token', keycloak.refreshToken);
          }
        });
      };
      onAuthenticatedCallback();
    } else {
      window.location.reload();
    }
  });
};

export const getKeycloak = () => keycloak;
