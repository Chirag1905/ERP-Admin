import axios from "axios";
export const getCampusGroup = async (obj) => {
  try {
    const response = await axios.get(
      "https://api.testmazing.com/campus/api/campusgroupspagination",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${obj.token}`,
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
  try {
    const response = await axios.post(
      "https://api.testmazing.com/campus/api/createcampusgroup",
      obj.data,
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

export const putCampusGroup = async (obj) => {
  try {
    const response = await axios.put(
      `https://api.testmazing.com/campus/api/updatecampusgroup/${obj.id}`,
      obj.data,
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