// outsource dependencies
import _ from 'lodash';
import { takeEvery, put, call, select } from 'redux-saga/effects';

// local dependencies
import { TYPES } from '../constans/types';
import {getData, getDataList} from '../services/api';

function* setData({ type, ...payload }) {
  const {currentCategory} = payload;
  const titleDrink = { isTitle: true, idDrink: currentCategory, strDrink: currentCategory };

  yield put({ type: TYPES.DATA, loading: true });
  try {
    const response = yield call(getData, currentCategory);

    yield put({ type: TYPES.DATA, data: [titleDrink, ...response] });

  } catch (e) {
    yield put({type: TYPES.SHOW_ERROR});
  }

  yield put({ type: TYPES.DATA, loading: false });
}

function* allCategory({ type, ...payload }) {
  yield put({ type: TYPES.DATA, loading: true });

  try {
    const response = yield call(getDataList);

    const payload = _.map(response, item => item.strCategory);
    yield put({ type: TYPES.CALL_CATEGORY, payload });

  } catch (e) {
    yield put({type: TYPES.SHOW_ERROR});
  }

  yield put({ type: TYPES.DATA, loading: false });
}

export default function* () {
  yield takeEvery(TYPES.SET_DATA, setData);
  yield takeEvery(TYPES.GET_CATEGORY, allCategory);
}
