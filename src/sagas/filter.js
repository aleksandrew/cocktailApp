// outsource dependencies
import {takeEvery, put, call} from 'redux-saga/effects';

// local dependencies
// import { TYPES } from '../screens/filter/types';
import {TYPES} from "../constans/types";
import {getDataList} from '../services/api';

function* getDataFilter() {
  yield put({type: TYPES.START_LOADING});
  try {

    const response = yield call(getDataList);

    yield put({type: TYPES.SET_DATA_FILTER, payload: response});

  } catch (e) {
    yield put({type: TYPES.SHOW_ERROR});
  }

  yield put({type: TYPES.FINISH_LOADING});
}

export default function* () {
  yield takeEvery(TYPES.GET_DATA_FILTER, getDataFilter);
}
