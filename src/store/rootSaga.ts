import { all, fork } from 'redux-saga/effects';
import { watchProductsSaga } from './sagas/productsSaga';
import { watchCartSaga } from './sagas/cartSaga';

export default function* rootSaga() {
  yield all([
    fork(watchProductsSaga),
    fork(watchCartSaga),
  ]);
}
