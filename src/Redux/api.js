import axios from "axios";


export const getCampus = (obj) => {
  console.log(obj, "obj")
  return axios
    .get("https://api.testmazing.com/campus/api/campusgroupspagination", {
      headers: {
        'Content-Type': 'application/json',
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
