// outsource dependencies
import { fork } from 'redux-saga/effects';

// local dependencies
import app from './app';
import filter from './filter';


function * sagasRoot () {
    yield fork(app);
    yield fork(filter);
}

export default sagasRoot;
