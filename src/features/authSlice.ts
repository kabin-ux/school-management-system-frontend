import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../lib/axios";
import type { AuthState } from "../types/auth";

export const loginSuperAdmin = createAsyncThunk(
  "auth/loginSuperAdmin",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await api.post("/super-admin/login", credentials);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await api.post("/school/login", credentials);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const loginAccountant = createAsyncThunk(
  "auth/loginAccountant",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await api.post("/accountant/login", credentials);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

const initialState: AuthState = {
  user: null,
  role: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.token = null;
      localStorage.removeItem("auth");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginSuperAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginSuperAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
        state.role = "superadmin";
        localStorage.setItem("auth", JSON.stringify(action.payload.data));
      })
      .addCase(loginSuperAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
         .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
        state.role = "admin";
        localStorage.setItem("auth", JSON.stringify(action.payload.data));
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
