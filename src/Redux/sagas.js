import { call, put, takeLatest } from 'redux-saga/effects';
import {
  requestGetCampus,
  receiveGetCampus,
  requestPostCampus,
  receivePostCampus,
  requestLogin,
  receiveLogin,
} from './actions';
import { getCampus, login, postCampus } from './api';

export function* getListcampus(action) {
  try {
    const response = yield call(getCampus, action.payload);
    yield put(receiveGetCampus(response));
  } catch (e) {
    console.log(e.message);
  }
}

export function* createCampus(action) {
  try {
    const response = yield call(postCampus, action.payload);
    yield put(receivePostCampus(response));
  } catch (e) {
    console.log(e.message);
  }
}

export function* campusLogin(action) {
  try {
    const response = yield call(login, action.payload);
    yield put(receiveLogin(response));
  } catch (e) {
    console.log(e.message);
  }
}

export default function* mainSaga() {
  yield takeLatest(requestGetCampus.type, getListcampus);
  yield takeLatest(requestPostCampus.type, createCampus);
  yield takeLatest(requestLogin.type, campusLogin);
}