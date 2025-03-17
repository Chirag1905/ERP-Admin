import Keycloak from "keycloak-js";

const keycloakConfig = {
  url: "https://api.testmazing.com/auth",
  realm: "school-group-1",
  clientId: "saas-ui-app",
};

const keycloak = new Keycloak(keycloakConfig);

const login = async (username, password) => {
  const response = await fetch(
    `${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "password",
        client_id: keycloakConfig.clientId,
        client_secret: "JPwfUjOQkfq1oy9RKOUIqToLQF9Egc2I",
        username: username,
        password: password,
        scope: "openid profile email",
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Authentication failed");
  }

  const data = await response.json();
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    idToken: data.id_token,
  };
};

const logout = () => {
  keycloak.logout();
};

export { keycloak, login, logout };
