import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

interface AuthState {
  userInfo: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Get user from localStorage
const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');

const initialState: AuthState = {
  userInfo: userInfo,
  isAuthenticated: !!userInfo,
  isLoading: false,
  error: null,
};

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (userData: any, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      if (response.data) {
        localStorage.setItem('userInfo', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async (userData: any, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData);
      if (response.data) {
        localStorage.setItem('userInfo', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userInfo');
      state.userInfo = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.userInfo = action.payload;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.userInfo = null;
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.userInfo = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.userInfo = null;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
