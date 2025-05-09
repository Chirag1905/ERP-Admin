import { all } from "redux-saga/effects";
import authSaga from "./features/auth/authSaga";
import academicYearSaga from "./features/academicYear/academicYearSaga";

export default function* rootSaga() {
  yield all([
    authSaga(),
    academicYearSaga(),
  ]);
}
