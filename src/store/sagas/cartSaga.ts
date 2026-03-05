import { takeLatest, select, call, put } from 'redux-saga/effects';
import { addToCart, removeFromCart, updateQuantity, clearCart, initCart } from '../slices/cartSlice';
import { RootState } from '../store';

function* loadCartFromStorage() {
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        yield put(initCart(parsed));
      } catch (e) {
        console.error('Ошибка при загрузке корзины из localStorage:', e);
      }
    }
  }
}

function* persistCartSaga(): Generator<any, void, any> {
  const cart: RootState['cart'] = yield select((state: RootState) => state.cart);
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

export function* watchCartSaga() {
  yield takeLatest([addToCart.type, removeFromCart.type, updateQuantity.type, clearCart.type], persistCartSaga);
  // Загружаем корзину при инициализации
  yield call(loadCartFromStorage);
}
