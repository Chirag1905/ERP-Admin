import { all } from "redux-saga/effects";
import campusSaga from "./sagas";

export default function* rootSaga() {
  yield all([campusSaga()]);
}