import { all } from "redux-saga/effects";
import campusGroupSaga from "./features/campusGroup/campusGroupSaga";
import authSaga from "./features/auth/authSaga";

export default function* rootSaga() {
  yield all([
    campusGroupSaga(),
    authSaga(),
  ]);
}
