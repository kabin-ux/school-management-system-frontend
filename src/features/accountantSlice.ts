import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import api from "../lib/axios";


// Add Accountant by School
export const addAccountantBySchool = createAsyncThunk(
  "accountant/addAccountantBySchool",
  async (accountantData: any, thunkAPI) => {
    try {
      const res = await api.post("/accountant", accountantData);
      return res.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to add accountant");
    }
  }
);

// Login Accountant
export const loginAccountant = createAsyncThunk(
  "accountant/loginAccountant",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await api.post("/accountant/login", credentials, {
        withCredentials: true,
      });
      return res.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Logout Accountant
export const logoutAccountant = createAsyncThunk(
  "accountant/logoutAccountant",
  async (_, thunkAPI) => {
    try {
      await api.post("/accountant/logout", {}, { withCredentials: true });
      return true;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

// Get all accountants (Super Admin)
export const getAllAccountant = createAsyncThunk(
  "accountant/getAllAccountant",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/accountant", {withCredentials: true});
      return res.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch accountants");
    }
  }
);

// Get all accountants by school
export const getAllAccountantBySchool = createAsyncThunk(
  "accountant/getAllAccountantBySchool",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/accountant/my-accountant");
      return res.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch accountants by school");
    }
  }
);

// Get Accountant Details
export const getAccountantDetails = createAsyncThunk(
  "accountant/getAccountantDetails",
  async (id: string, thunkAPI) => {
    try {
      const res = await api.get(`/accountant/${id}`);
      return res.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch accountant details");
    }
  }
);

// Update Accountant
export const updateAccountant = createAsyncThunk(
  "accountant/updateAccountant",
  async (updates: any, thunkAPI) => {
    try {
      const res = await api.put("/accountant", updates);
      return res.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update accountant");
    }
  }
);

// Delete Accountant
export const deleteAccountant = createAsyncThunk(
  "accountant/deleteAccountant",
  async (id: string, thunkAPI) => {
    try {
      await api.delete("/accountant", { data: { id } });
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete accountant");
    }
  }
);

// --------------------- SLICE ---------------------

interface AccountantState {
  accountants: any[];
  accountantBySchool: any[];
  currentAccountant: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: AccountantState = {
  accountants: [],
  accountantBySchool: [],
  currentAccountant: null,
  loading: false,
  error: null,
};

const accountantSlice = createSlice({
  name: "accountant",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Add
    builder.addCase(addAccountantBySchool.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addAccountantBySchool.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.accountants.push(action.payload);
    });
    builder.addCase(addAccountantBySchool.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Login
    builder.addCase(loginAccountant.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginAccountant.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.currentAccountant = action.payload;
    });
    builder.addCase(loginAccountant.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Logout
    builder.addCase(logoutAccountant.fulfilled, (state) => {
      state.currentAccountant = null;
    });

    // Get All
    builder.addCase(getAllAccountant.fulfilled, (state, action: PayloadAction<any[]>) => {
      state.accountants = action.payload;
    });

    // Get All By School
    builder.addCase(getAllAccountantBySchool.fulfilled, (state, action: PayloadAction<any[]>) => {
      state.accountantBySchool = action.payload;
    });

    // Get Details
    builder.addCase(getAccountantDetails.fulfilled, (state, action: PayloadAction<any>) => {
      state.currentAccountant = action.payload;
    });

    // Update
    builder.addCase(updateAccountant.fulfilled, (state, action: PayloadAction<any>) => {
      state.currentAccountant = { ...state.currentAccountant, ...action.payload };
    });

    // Delete
    builder.addCase(deleteAccountant.fulfilled, (state, action: PayloadAction<string>) => {
      state.accountants = state.accountants.filter((acc) => acc.id !== action.payload);
    });
  },
});

export const { clearError } = accountantSlice.actions;
export default accountantSlice.reducer;
