import axios from "axios";

export const getCampus = (obj) => {
  console.log(obj, "Main object");
  return axios
    .get("https://api.testmazing.com/campus/api/campusgroupspagination", {
      headers: {
        "Content-Type": "application/json",
      },
      params: obj.data,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err, "err");
      return err.response;
    });
};
