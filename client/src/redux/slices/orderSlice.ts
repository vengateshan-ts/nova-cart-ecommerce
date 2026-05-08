import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/orders`;

interface OrderState {
  orders: any[];
  order: any | null;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  order: null,
  isLoading: false,
  isSuccess: false,
  error: null,
};

// Create new order
export const createOrder = createAsyncThunk(
  'orders/create',
  async (orderData: any, thunkAPI: any) => {
    try {
      const { auth } = thunkAPI.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${auth.userInfo.token}`,
        },
      };
      const response = await axios.post(API_URL, orderData, config);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get my orders
export const fetchMyOrders = createAsyncThunk(
  'orders/fetchMy',
  async (_, thunkAPI: any) => {
    try {
      const { auth } = thunkAPI.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${auth.userInfo.token}`,
        },
      };
      const response = await axios.get(`${API_URL}/myorders`, config);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = null;
    },
    clearOrder: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.order = action.payload;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchMyOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetOrderState, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
