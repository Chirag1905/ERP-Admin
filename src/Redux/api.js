import axios from "axios";
// import Keycloak from "keycloak-js";

const keycloakConfig = {
  url: "https://api.testmazing.com/auth",
  realm: "school-group-1",
  clientId: "saas-ui-app",
};

// const keycloak = new Keycloak(keycloakConfig);

export const getCampus = async (obj) => {
  // console.log(obj, "Main object For Get");
  try {
    const response = await axios.get(
      "https://api.testmazing.com/campus/api/campusgroupspagination",
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: obj.data,
      }
    );
    return response;
  } catch (err) {
    console.log(err, "err");
    return err.response;
  }
};

export const postCampus = async (obj) => {
  console.log(obj, "Main object");
  try {
    const response = await axios.post(
      "https://api.testmazing.com/campus/api/createcampusgroup",
      obj.data,
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

export const login = async (obj) => {
  console.log(obj, "Main object");
  try {
    const formData = new URLSearchParams();
    for (const key in obj) {
      formData.append(key, obj[key]);
    }

    const response = await axios.post(
      "https://api.testmazing.com/auth/realms/school-group-1/protocol/openid-connect/token",
      formData.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err, "err");
    return err.response;
  }
};
