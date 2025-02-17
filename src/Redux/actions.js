//get campus
export const REQUEST_GET_CAMPUS = "REQUEST_GET_CAMPUS";
export const RECEIVE_GET_CAMPUS = "RECEIVE_GET_CAMPUS";
export const requestGetCampus = (obj) => ({ type: REQUEST_GET_CAMPUS, obj });
export const receiveGetCampus = (data) => ({ type: RECEIVE_GET_CAMPUS, data });

//logout
export const USER_LOGOUT = "USER_LOGOUT";
export const userLogout = () => ({ type: USER_LOGOUT });










