import axios from "axios";

const signIn = async (username, password) => {
  try {
    const response = await axios.post(
      `https://api.testmazing.com/api/auth/login`,
      new URLSearchParams({
        username: username,
        password: password,
        clientId: "admin-cli",
        realmName: "master"
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return {
      accessToken: response.data.access_token,
      // refreshToken: response.data.refresh_token,
      // idToken: response.data.id_token,
      // expiresIn: response.data.expires_in,
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
    // await axios.post(
    //   `${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/revoke`,
    //   new URLSearchParams({
    //     client_id: keycloakConfig.clientId,
    //     client_secret: keycloakConfig.clientSecret,
    //     token: refreshToken, // Revoke refresh token
    //   }),
    //   {
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //   }
    // );

    // // Logout from Keycloak
    // keycloak.logout({ redirectUri: "/" });
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

export { signIn, signOut };
