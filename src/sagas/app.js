// outsource dependencies
import _ from 'lodash';
import { takeEvery, put, call } from 'redux-saga/effects';

// local dependencies
import { TYPES } from '../constans/types';
import {getData, getDataList} from '../services/api';

function* setData({ type, ...payload }) {
  const {currentCategory} = payload;
  const titleDrink = { isTitle: true, idDrink: currentCategory, strDrink: currentCategory };

  yield put({type: TYPES.START_LOADING});

  try {
    const response = yield call(getData, currentCategory);

    yield put({ type: TYPES.CALL_SUCCESS, payload: [titleDrink, ...response] });

  } catch (e) {
    yield put({type: TYPES.SHOW_ERROR});
  }

  yield put({type: TYPES.FINISH_LOADING});
}

function* allCategory({ type, ...payload }) {
  yield put({type: TYPES.START_LOADING});

  try {
    const response = yield call(getDataList);

    const payload = _.map(response, item => item.strCategory);
    yield put({ type: TYPES.CALL_CATEGORY, payload });

  } catch (e) {
    yield put({type: TYPES.SHOW_ERROR});
  }

  yield put({type: TYPES.FINISH_LOADING});
}

export default function* () {
  yield takeEvery(TYPES.SET_DATA, setData);
  yield takeEvery(TYPES.GET_CATEGORY, allCategory);
}
