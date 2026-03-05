import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { fetchProductsRequest, fetchProductsSuccess, fetchProductsFailure } from '../slices/productsSlice';

function* fetchProductsSaga(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, '/api/products');
    yield put(fetchProductsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchProductsFailure(error.message));
  }
}

export function* watchProductsSaga() {
  yield takeLatest(fetchProductsRequest.type, fetchProductsSaga);
}
