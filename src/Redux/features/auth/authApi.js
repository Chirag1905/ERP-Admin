import axios from "axios";

const signIn = async (obj) => {
  try {
    const response = await axios.post(
      `https://api.testmazing.com/api/auth/login`,
      obj,
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

const signOut = async () => {
  try {

  } catch (error) {
    console.error("Logout failed:", error);
  }
};

const setPermanentPass = async (obj) => {
  try {
    const response = await axios.post(
      `https://api.testmazing.com/api/auth/password/set-permanent`,
      obj.params,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${obj.token}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err, "err");
    return err.response;
  }
};

const forgotPass = async (obj) => {
  try {
    const response = await axios.post(
      `https://api.testmazing.com/api/auth/password/forgot`,
      obj,
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

const resetPass = async (obj) => {
  try {
    const response = await axios.post(
      `https://api.testmazing.com/api/auth/password/reset`,
      obj.params,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${obj.token}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err, "err");
    return err.response;
  }
};

const fetchData = async () => {
  try {
    const response = await axios.get(`https://testmazingutils.s3.us-east-1.amazonaws.com/realm_client_mappings.json`);
    return response;
  } catch (err) {
    console.log(err, "err");
    return err.response;
  }
};
export { signIn, signOut, setPermanentPass, forgotPass, resetPass, fetchData };