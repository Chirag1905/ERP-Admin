import axios from "axios";

export const getCampus = async (obj) => {
  // console.log(obj, "Main object For Get Campus");
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
  // console.log(obj, "Main object Post Campus");
  try {
    const response = await axios.post(
      "https://api.testmazing.com/campus/api/createcampusgroup",
      obj,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("🚀 ~ postCampus ~ response:", response);
    return response;
  } catch (err) {
    console.log(err, "err");
    return err.response;
  }
};

export const login = async (obj) => {
  // console.log(obj, "Main object Login");
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
