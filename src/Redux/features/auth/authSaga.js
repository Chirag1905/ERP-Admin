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
    const tokens = yield call(signIn, username, password);
    // Calculate the expiry time
    const expiryTime = new Date().getTime() + tokens.expiresIn * 1000;
    yield put(
      signInSuccess({
        user: { username },
        token: tokens.accessToken,
        expiryTime,
      })
    );
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
