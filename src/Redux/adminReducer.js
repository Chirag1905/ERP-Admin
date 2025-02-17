import {
  RECEIVE_GET_CAMPUS,
} from "./actions";

export default (state = {}, { type, data }) => {
  switch (type) {

    case RECEIVE_GET_CAMPUS:
      return {
        ...state,
        campusData: data,
      };
    default:
      return state;
  }
};
