import { call, put, takeLatest } from "redux-saga/effects";
import {
  getAcademicYearRequest,
  getAcademicYearSuccess,
  getAcademicYearFailure,
  postAcademicYearRequest,
  postAcademicYearSuccess,
  postAcademicYearFailure,
  putAcademicYearSuccess,
  putAcademicYearFailure,
  putAcademicYearRequest,
} from "./academicYearSlice";
import {
  getAcademicYear,
  postAcademicYear,
  putAcademicYear,
} from "./academicYearApi";

function* getAcademicYearSaga(action) {
  try {
    const response = yield call(getAcademicYear, action.payload);
    yield put(getAcademicYearSuccess(response.data));
  } catch (error) {
    yield put(getAcademicYearFailure(error.message));
  }
}

function* postAcademicYearSaga(action) {
  try {
    const response = yield call(postAcademicYear, action.payload);
    if (response.status === 200 || response.status === 201) {
      yield put(postAcademicYearSuccess(response.data));
      yield put(
        getAcademicYearRequest({
          data: { page: 0, size: 10, sortBy: "id", ascending: true },
        })
      );
    } else {
      // Handle validation errors or other API errors
      yield put(
        postAcademicYearFailure({
          message: response.data.message,
          error: response.data.errors,
        })
      );
    }
  } catch (error) {
    // Handle unexpected errors (e.g., network issues)
    yield put(
      postAcademicYearFailure({
        message: error.data.message,
        error: error.data.errors,
      })
    );
  }
}

// Add new saga for updating campus data
function* putAcademicYearSaga(action) {
  try {
    const { id, data } = action.payload;
    const response = yield call(putAcademicYear, id, data);
    if (response.status === 200 || response.status === 201) {
      yield put(putAcademicYearSuccess(response.data));
      yield put(
        getAcademicYearRequest({
          data: { page: 0, size: 10, sortBy: "id", ascending: true },
        })
      );
    } else {
      yield put(
        putAcademicYearFailure({
          message: response.data.message,
          error: response.data.errors,
        })
      );
    }
  } catch (error) {
    yield put(
      putAcademicYearFailure({
        message: error,
        error: [],
      })
    );
  }
}

export default function* campusSaga() {
  yield takeLatest(getAcademicYearRequest.type, getAcademicYearSaga);
  yield takeLatest(postAcademicYearRequest.type, postAcademicYearSaga);
  yield takeLatest(putAcademicYearRequest.type, putAcademicYearSaga);
}
