import {
  RECEIVE_GET_CAMPUS,
  RECEIVE_POST_CAMPUS,
  RECEIVE_LOGIN,
} from "./actions";

// Initial state
const initialState = {
  campusData: [],
  loginData:[] // Assuming campusData is an array
};

export default (state = initialState, { type, data }) => {
  switch (type) {
    case RECEIVE_GET_CAMPUS:
      return {
        ...state,
        campusData: data, // Replace the entire campusData with the new data
      };

    case RECEIVE_POST_CAMPUS:
      return {
        ...state,
        campusDataPost: data, // Append the new data to the existing campusData
      };
      
    case RECEIVE_LOGIN:
      return {
        ...state,
        loginData: data,
      };

    default:
      return state;
  }
};
