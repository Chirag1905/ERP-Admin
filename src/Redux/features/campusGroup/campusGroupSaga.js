import { call, put, takeLatest } from "redux-saga/effects";
import {
  getCampusGroupRequest,
  getCampusGroupSuccess,
  getCampusGroupFailure,
  postCampusGroupRequest,
  postCampusGroupSuccess,
  postCampusGroupFailure,
  putCampusGroupSuccess,
  putCampusGroupFailure,
  putCampusGroupRequest,
  postRealmSuccess,
  postRealmFailure,
  postRealmRequest,
} from "./campusGroupSlice";
import {
  getCampusGroup,
  postCampusGroup,
  putCampusGroup,
} from "./campusGroupApi";

function* getCampusGroupSaga(action) {
  try {
    const response = yield call(getCampusGroup, action.payload);
    yield put(getCampusGroupSuccess(response.data));
  } catch (error) {
    yield put(getCampusGroupFailure(error.message));
  }
}

function* postCampusGroupSaga(action) {
  try {
    const response = yield call(postCampusGroup, action.payload);
    if (response.status === 200 || response.status === 201) {
      yield put(postCampusGroupSuccess(response.data));
      yield put(
        getCampusGroupRequest({
          data: { page: 0, size: 10, sortBy: "id", ascending: true },
        })
      );
    } else {
      // Handle validation errors or other API errors
      yield put(
        postCampusGroupFailure({
          message: response.data.message,
          error: response.data.errors,
        })
      );
    }
  } catch (error) {
    // Handle unexpected errors (e.g., network issues)
    yield put(
      postCampusGroupFailure({
        message: error.data.message,
        error: error.data.errors,
      })
    );
  }
}

// Add new saga for updating campus data
function* putCampusGroupSaga(action) {
  try {
    const response = yield call(putCampusGroup, action.payload);
    if (response.status === 200 || response.status === 201) {
      yield put(putCampusGroupSuccess(response.data));
      yield put(
        getCampusGroupRequest({
          data: { page: 0, size: 10, sortBy: "id", ascending: true },
        })
      );
    } else {
      yield put(
        putCampusGroupFailure({
          message: response.data.message,
          error: response.data.errors,
        })
      );
    }
  } catch (error) {
    yield put(
      putCampusGroupFailure({
        message: error,
        error: [],
      })
    );
  }
}

export default function* campusGroupSaga() {
  yield takeLatest(getCampusGroupRequest.type, getCampusGroupSaga);
  yield takeLatest(postCampusGroupRequest.type, postCampusGroupSaga);
  yield takeLatest(putCampusGroupRequest.type, putCampusGroupSaga);
}
