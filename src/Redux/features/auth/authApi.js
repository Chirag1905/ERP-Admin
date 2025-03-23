import axios from "axios";

const keycloakConfig = {
  url: "https://api.testmazing.com/auth",
  realm: "school-group-1",
  clientId: "saas-ui-app",
  clientSecret: "JPwfUjOQkfq1oy9RKOUIqToLQF9Egc2I",
};

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
    };
  } catch (error) {
    throw new Error(
      "Authentication failed: " + error.response?.data?.error_description ||
        error.message
    );
  }
};

const signOut = () => {
  // Implement sign-out logic if needed
  // keycloak.logout();
};

export { signIn, signOut };
