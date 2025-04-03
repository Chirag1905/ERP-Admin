import axios from "axios";

const signIn = async (username, password) => {
  try {
    const response = await axios.post(
      `https://api.testmazing.com/api/auth/login`,
      {
        username: username,
        password: password,
        clientId: "admin-cli",
        realmName: "master"
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (err) {
    console.log(err, "err");
    return err.response;
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
