import { call, put, takeLatest } from "redux-saga/effects";
import { signIn, signOut } from "./authApi";
import {
  signInRequest,
  signInSuccess,
  signInFailure,
  signOutSuccess,
} from "./authSlice";

function* signInSaga(action) {
  try {
    const { username, password } = action.payload;
    const response = yield call(signIn, username, password);
    yield put(signInSuccess(response.data));
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

function* signOutSaga() {
  yield call(signOut);
  yield put(signOutSuccess());
}

export default function* authSaga() {
  yield takeLatest(signInRequest.type, signInSaga);
  yield takeLatest(signOutSuccess.type, signOutSaga);
}
