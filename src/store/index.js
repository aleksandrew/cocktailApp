// outsource dependencies
import { reducer as form } from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, combineReducers, createStore } from 'redux';

// local dependencies
import app from './app';
import sagasRoot from '../sagas/index';
import filter from './filter';

// dev tools middleware
const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const reducers = combineReducers({
  app,
  form,
  filter,
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducers, applyMiddleware(sagaMiddleware), reduxDevTools);
sagaMiddleware.run(sagasRoot);

export default store;
