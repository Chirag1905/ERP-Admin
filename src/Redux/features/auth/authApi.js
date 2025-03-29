import axios from "axios";
import Keycloak from "keycloak-js";

const keycloakConfig = {
  url: "https://api.testmazing.com/auth",
  realm: "school-group-1",
  clientId: "saas-ui-app",
  clientSecret: "JPwfUjOQkfq1oy9RKOUIqToLQF9Egc2I",
};

const keycloak = new Keycloak(keycloakConfig);

const signIn = async (username, password) => {
  try {
    const response = await axios.post(
      `${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`,
      new URLSearchParams({
        grant_type: "password",
        client_id: keycloakConfig.clientId,
        client_secret: keycloakConfig.clientSecret,
        username: username,
        password: password,
        scope: "openid profile email",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
      idToken: response.data.id_token,
      expiresIn: response.data.expires_in,
    };
  } catch (error) {
    const errorMessage =
      error.response?.data?.error_description || error.message;
    throw new Error(`Authentication failed: ${errorMessage}`);
  }
};

const signOut = async (accessToken, refreshToken) => {
  try {
    // Revoke tokens (optional)
    await axios.post(
      `${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/revoke`,
      new URLSearchParams({
        client_id: keycloakConfig.clientId,
        client_secret: keycloakConfig.clientSecret,
        token: refreshToken, // Revoke refresh token
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // Logout from Keycloak
    keycloak.logout({ redirectUri: "/" });
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

export { signIn, signOut };
