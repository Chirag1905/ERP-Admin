import axios from "axios";
export const getCampus = async (obj) => {
  try {
    const response = await axios.get(
      "https://api.testmazing.com/campus/api/campuspagination",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${obj?.token}`,
        },
        params: obj?.data,
      }
    );
    return response;
  } catch (err) {
    console.log(err, "err");
    return err.response;
  }
};

export const postCampus = async (obj) => {
  try {
    const response = await axios.post(
      "https://api.testmazing.com/campus/api/createcampus",
      obj?.data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${obj?.token}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err, "err");
    return err.response;
  }
};

export const putCampus = async (obj) => {
  try {
    const response = await axios.put(
      `https://api.testmazing.com/campus/api/updatecampus/${obj?.id}`,
      obj?.data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${obj?.token}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err, "err");
    return err.response;
  }
};