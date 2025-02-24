//Get campus
export const REQUEST_GET_CAMPUS = "REQUEST_GET_CAMPUS";
export const RECEIVE_GET_CAMPUS = "RECEIVE_GET_CAMPUS";
export const requestGetCampus = (obj) => ({ type: REQUEST_GET_CAMPUS, obj });
export const receiveGetCampus = (data) => ({ type: RECEIVE_GET_CAMPUS, data });

// Post campus
export const REQUEST_POST_CAMPUS = "REQUEST_POST_CAMPUS";
export const RECEIVE_POST_CAMPUS = "RECEIVE_POST_CAMPUS";
export const requestPostCampus = (obj) => ({ type: REQUEST_POST_CAMPUS, obj });
export const receivePostCampus = (data) => ({ type: RECEIVE_POST_CAMPUS, data });

//logout
export const USER_LOGOUT = "USER_LOGOUT";
export const userLogout = () => ({ type: USER_LOGOUT });