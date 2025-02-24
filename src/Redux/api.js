import axios from "axios";

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
