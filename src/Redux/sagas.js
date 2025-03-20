import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchCampusRequest,
  fetchCampusSuccess,
  fetchCampusFailure,
  createCampusRequest,
  createCampusSuccess,
  createCampusFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
} from "./campusSlice";
import { getCampus, postCampus, login } from "./api";

// Fetch Campus Saga
function* fetchCampusSaga(action) {
  try {
    const response = yield call(getCampus, action.payload);
    yield put(fetchCampusSuccess(response.data));
  } catch (error) {
    yield put(fetchCampusFailure(error.message));
  }
}

// Create Campus Saga
function* createCampusSaga(action) {
  try {
    const response = yield call(postCampus, action.payload);
    yield put(createCampusSuccess(response.data));
  } catch (error) {
    yield put(createCampusFailure(error.message));
  }
}

// Login Saga
function* loginSaga(action) {
  try {
    const response = yield call(login, action.payload);
    yield put(loginSuccess(response.data));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

// Watcher Saga
export default function* campusSaga() {
  yield takeLatest(fetchCampusRequest.type, fetchCampusSaga);
  yield takeLatest(createCampusRequest.type, createCampusSaga);
  yield takeLatest(loginRequest.type, loginSaga);
}