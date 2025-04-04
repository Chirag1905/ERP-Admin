import { call, put, takeLatest } from "redux-saga/effects";
import { forgotPass, resetPass, setPermanentPass, signIn, signOut } from "./authApi";
import {
  signInRequest,
  signInSuccess,
  signInFailure,

  signOutRequest,
  signOutSuccess,
  signOutFailure,

  setPermanentPassRequest,
  setPermanentPassSuccess,
  setPermanentPassFailure,

  forgotPassRequest,
  forgotPassFailure,
  forgotPassSuccess,

  resetPassRequest,
  resetPassFailure,
  resetPassSuccess,
} from "./authSlice";

function* signInSaga(action) {
  try {
    const response = yield call(signIn, action.payload);
    if (response.status === 200 || response.status === 201) {
      yield put(signInSuccess(response.data));
    } else {
      yield put(signInFailure(response.status))
    }
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

// function* signOutSaga() {
//   yield call(signOut);
//   yield put(signOutSuccess());
// }

function* setPermanentPassSaga(action) {
  try {
    const response = yield call(setPermanentPass, action.payload);
    if (response.status === 200 || response.status === 201) {
      yield put(setPermanentPassSuccess(response.data));
    } else {
      yield put(setPermanentPassFailure(response.message))
    }
  } catch (error) {
    yield put(setPermanentPassFailure(error.message));
  }
}

function* forgotPassSaga(action) {
  try {
    const response = yield call(forgotPass, action.payload);
    if (response.status === 200 || response.status === 201) {
      yield put(forgotPassSuccess(response.data));
    } else {
      yield put(forgotPassFailure(response.message))
    }
  } catch (error) {
    yield put(forgotPassFailure(error.message));
  }
}

function* resetPassSaga(action) {
  try {
    const response = yield call(resetPass, action.payload);
    if (response.status === 200 || response.status === 201) {
      yield put(resetPassSuccess(response.data));
    } else {
      yield put(resetPassFailure(response.message))
    }
  } catch (error) {
    yield put(resetPassFailure(error.message));
  }
}

export default function* authSaga() {
  yield takeLatest(signInRequest.type, signInSaga);
  // yield takeLatest(signOutSuccess.type, signOutSaga);
  yield takeLatest(setPermanentPassRequest.type, setPermanentPassSaga);
  yield takeLatest(forgotPassRequest.type, forgotPassSaga);
  yield takeLatest(resetPassRequest.type, resetPassSaga);
}
