import { all } from "redux-saga/effects";
import campusSaga from "./features/campus/campusSaga";
import authSaga from "./features/auth/authSaga";

export default function* rootSaga() {
  yield all([
    campusSaga(),
    authSaga(),
  ]);
}
