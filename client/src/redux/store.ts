import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import orderReducer from './slices/orderSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    cart: cartReducer,
    auth: authReducer,
    products: productReducer,
    orders: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
