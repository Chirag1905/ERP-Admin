import {
  RECEIVE_GET_CAMPUS,
  RECEIVE_POST_CAMPUS,
} from "./actions";

// Initial state
const initialState = {
  campusData: [], // Assuming campusData is an array
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
        campusData: [...state.campusData, data], // Append the new data to the existing campusData
      };

    default:
      return state;
  }
};