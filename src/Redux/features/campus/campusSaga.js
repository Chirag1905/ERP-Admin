import { call, put, takeLatest } from "redux-saga/effects";
import {
  getCampusRequest,
  getCampusSuccess,
  getCampusFailure,
  postCampusRequest,
  postCampusSuccess,
  postCampusFailure,
  putCampusSuccess,
  putCampusFailure,
  putCampusRequest,
  postRealmSuccess,
  postRealmFailure,
  postRealmRequest,
} from "./campusSlice";
import {
  getCampus,
  postCampus,
  putCampus,
} from "./campusApi";

function* getCampusSaga(action) {
  try {
    const response = yield call(getCampus, action.payload);
    yield put(getCampusSuccess(response.data));
  } catch (error) {
    yield put(getCampusFailure(error.message));
  }
}

function* postCampusSaga(action) {
  try {
    const response = yield call(postCampus, action.payload);
    if (response.status === 200 || response.status === 201) {
      yield put(postCampusSuccess(response.data));
      yield put(
        getCampusRequest({
          data: { page: 0, size: 10, sortBy: "id", ascending: true },
        })
      );
    } else {
      // Handle validation errors or other API errors
      yield put(
        postCampusFailure({
          message: response.data.message,
          error: response.data.errors,
        })
      );
    }
  } catch (error) {
    // Handle unexpected errors (e.g., network issues)
    yield put(
      postCampusFailure({
        message: error.data.message,
        error: error.data.errors,
      })
    );
  }
}

// Add new saga for updating campus data
function* putCampusSaga(action) {
  try {
    const { id, data } = action.payload;
    const response = yield call(putCampus, id, data);
    if (response.status === 200 || response.status === 201) {
      yield put(putCampusSuccess(response.data));
      yield put(
        getCampusRequest({
          data: { page: 0, size: 10, sortBy: "id", ascending: true },
        })
      );
    } else {
      yield put(
        putCampusFailure({
          message: response.data.message,
          error: response.data.errors,
        })
      );
    }
  } catch (error) {
    yield put(
      putCampusFailure({
        message: error,
        error: [],
      })
    );
  }
}

export default function* campusSaga() {
  yield takeLatest(getCampusRequest.type, getCampusSaga);
  yield takeLatest(postCampusRequest.type, postCampusSaga);
  yield takeLatest(putCampusRequest.type, putCampusSaga);
}
