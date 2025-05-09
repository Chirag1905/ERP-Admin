import axios from "axios";
export const getAcademicYear = async (obj) => {
  try {
    const response = await axios.get(
      "https://api.testmazing.com/campus/api/academicyearpagination",
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

export const postAcademicYear = async (obj) => {
  try {
    const response = await axios.post(
      "https://api.testmazing.com/campus/api/createacademicyear",
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

export const putAcademicYear = async (obj) => {
  try {
    const response = await axios.put(
      `https://api.testmazing.com/campus/api/updateacademicyear/${obj?.id}`,
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
