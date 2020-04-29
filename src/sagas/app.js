// outsource dependencies
import { takeEvery, put, call } from 'redux-saga/effects';

// local dependencies
import { TYPES } from '../constans/types';
import { getData } from '../services/api';

function* setData({ type, ...payload }) {
  const {id, category} = payload;


  yield put({type: TYPES.START_LOADING});
  try {
    yield put({type: TYPES.LOADING});

    const currentCategory = category[id];
    const response = yield call(getData, currentCategory);

    yield put({ type: TYPES.CALL_SUCCESS, payload: response });

  } catch (e) {
    yield put({type: TYPES.SHOW_ERROR});
  }

  yield put({type: TYPES.FINISH_LOADING});
}

export default function* () {
  yield takeEvery(TYPES.SET_DATA, setData);
}
