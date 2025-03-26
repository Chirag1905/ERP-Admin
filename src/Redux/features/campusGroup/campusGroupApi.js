import axios from "axios";

export const getCampusGroup = async (obj) => {
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

export const postCampusGroup = async (obj) => {
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
    return response;
  } catch (err) {
    console.log(err, "err");
    return err.response;
  }
};

export const putCampusGroup = async (id, data) => {
  try {
    const response = await axios.put(
      `https://api.testmazing.com/campus/api/updatecampusgroup/${id}`,
      data,
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