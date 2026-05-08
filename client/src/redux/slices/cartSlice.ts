import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/product';
import axios from 'axios';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  isLoading: boolean;
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cartItems') || '[]'),
  total: 0,
  isLoading: false,
};

// Calculate total helper
const calculateTotal = (items: CartItem[]) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

// Sync cart with backend
export const syncCartWithBackend = createAsyncThunk(
  'cart/sync',
  async (items: CartItem[], thunkAPI: any) => {
    try {
      const { auth } = thunkAPI.getState();
      if (!auth.userInfo) return;

      const config = {
        headers: {
          Authorization: `Bearer ${auth.userInfo.token}`,
        },
      };

      const cartData = {
        cartItems: items.map(item => ({
          product: item._id || item.id,
          qty: item.quantity
        }))
      };

      await axios.put(`${import.meta.env.VITE_API_URL}/auth/cart`, cartData, config);
    } catch (error) {
      console.error('Failed to sync cart', error);
    }
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    ...initialState,
    total: calculateTotal(initialState.items)
  },
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const id = action.payload._id || action.payload.id;
      const existingItem = state.items.find(item => (item._id || item.id) === id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total = calculateTotal(state.items);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => (item._id || item.id) !== action.payload);
      state.total = calculateTotal(state.items);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => (item._id || item.id) === action.payload.id);
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      }
      state.total = calculateTotal(state.items);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    setCart: (state, action: PayloadAction<any[]>) => {
      state.items = action.payload.map(item => ({
        ...item.product,
        quantity: item.qty
      }));
      state.total = calculateTotal(state.items);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      localStorage.removeItem('cartItems');
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity, setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
