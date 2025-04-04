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

function* getCampusSaga(action) {
  try {
    const response = yield call(getCampusGroup, action.payload);
    yield put(getCampusGroupSuccess(response.data));
  } catch (error) {
    yield put(getCampusGroupFailure(error.message));
  }
}

function* postCampusSaga(action) {
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
function* putCampusSaga(action) {
  try {
    const { id, data } = action.payload;
    const response = yield call(putCampusGroup, id, data);
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


// function* postRealmSaga(action) {
//   try {
//     const response = yield call(postCampusGroup, action.payload);
//     if (response.status === 200 || response.status === 201) {
//       yield put(postRealmSuccess(response.data));
//     } else {
//       // Handle validation errors or other API errors
//       yield put(
//         postRealmFailure({
//           message: response.data.message,
//           error: response.data.errors,
//         })
//       );
//     }
//   } catch (error) {
//     // Handle unexpected errors (e.g., network issues)
//     yield put(
//       postRealmFailure({
//         message: error.data.message,
//         error: error.data.errors,
//       })
//     );
//   }
// }

export default function* campusSaga() {
  yield takeLatest(getCampusGroupRequest.type, getCampusSaga);
  yield takeLatest(postCampusGroupRequest.type, postCampusSaga);
  yield takeLatest(putCampusGroupRequest.type, putCampusSaga);
  // yield takeLatest(postRealmRequest.type, postRealmSaga);
}
