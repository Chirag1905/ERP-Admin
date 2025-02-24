import { call, put, takeLatest } from 'redux-saga/effects';
import {
  REQUEST_GET_CAMPUS,
  receiveGetCampus, 
  REQUEST_POST_CAMPUS,
  receivePostCampus

} from './actions'

import {
  getCampus,
  postCampus
} from './api'


export function* getListcampus(action) {
  try {
    const response = yield call(getCampus, action.obj)

    yield put(receiveGetCampus(response))
  } catch (e) {
    console.log(e.message)
  }
}

export function* createCampus(action) {
  try {
    const response = yield call(postCampus, action.obj)
  
    yield put(receivePostCampus(response))
  } catch (e) {
    console.log(e.message)
  }
}

export default function* mainSaga() {
  yield takeLatest(REQUEST_GET_CAMPUS, getListcampus);
  yield takeLatest(REQUEST_POST_CAMPUS, createCampus)
}