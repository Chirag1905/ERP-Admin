import { call, put, takeLatest } from 'redux-saga/effects';
import {
  REQUEST_GET_CAMPUS,
  receiveGetCampus, 
} from './actions'

import {
  getCampus,
} from './api'


export function* getListcampus(action) {
  try {
    const response = yield call(getCampus, action.obj)

    yield put(receiveGetCampus(response))
  } catch (e) {
    console.log(e.message)
  }
}


export default function* mainSaga() {
  yield takeLatest(REQUEST_GET_CAMPUS, getListcampus)
}