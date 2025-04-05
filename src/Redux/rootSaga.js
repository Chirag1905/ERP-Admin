import { all } from "redux-saga/effects";
import campusGroupSaga from "./features/campusGroup/campusGroupSaga";
import authSaga from "./features/auth/authSaga";
import campusSaga from "./features/campus/campusSaga";

export default function* rootSaga() {
  yield all([
    campusSaga(),
    campusGroupSaga(),
    authSaga(),
  ]);
}
