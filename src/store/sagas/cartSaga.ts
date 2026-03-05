import { takeLatest, select } from 'redux-saga/effects';
import { addToCart, removeFromCart, updateQuantity, clearCart } from '../slices/cartSlice';
import { RootState } from '../store';

function* persistCartSaga() {
  const cart = yield select((state: RootState) => state.cart);
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function* watchCartSaga() {
  yield takeLatest([addToCart.type, removeFromCart.type, updateQuantity.type, clearCart.type], persistCartSaga);
}
