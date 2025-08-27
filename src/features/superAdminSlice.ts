import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import api from "../lib/axios";

export interface SuperAdmin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  address: string;
  created_by: string | null;
  status: "active" | "inactive" | string; // enum-like, can refine later
  profile_image: string | null;
  phone_number: string;
  createdAt?: string;   // ISO date string, can also use Date type
  updatedAt?: string;
  deletedAt?: string | null;
}

interface SuperAdminState {
  superAdmins: SuperAdmin[];
  selectedSuperAdmin: SuperAdmin | null;
  loading: boolean;
  error: string | null;
}

export const createSuperAdmin = createAsyncThunk<
  SuperAdmin, // return type
  Omit<SuperAdmin, "id" | "createdAt" | "updatedAt" | "deletedAt" | "created_by"> & { password: string }, // input type
  { rejectValue: string }
>("superAdmin/createSuperAdmin", async (superAdminData, { rejectWithValue }) => {
  try {
    const resp = await api.post("/super-admin", superAdminData, {
      withCredentials: true,
    });
    return resp.data.data as SuperAdmin;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to create super admin"
    );
  }
});

// Get all Super Admins
export const fetchSuperAdmins = createAsyncThunk(
  "superAdmin/fetchSuperAdmins",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/super-admin");
      return res.data.data as SuperAdmin[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch super admins");
    }
  }
);

// Get Super Admin Details
export const fetchSuperAdminDetails = createAsyncThunk(
  "superAdmin/fetchSuperAdminDetails",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/super-admin/${id}`);
      return res.data.data as SuperAdmin;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch super admin details");
    }
  }
);

// Delete a Super Admin
export const deleteSuperAdmin = createAsyncThunk(
  "superAdmin/deleteSuperAdmin",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/super-admin?id=${id}`);
      return id; // return id so we can remove it from state
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete super admin");
    }
  }
);

// Update Super Admin Details
export const updateSuperAdmin = createAsyncThunk(
  "superAdmin/updateSuperAdmin",
  async (data: Partial<SuperAdmin>, { rejectWithValue }) => {
    try {
      const res = await api.put(`/super-admin`, data);
      return res.data.data as SuperAdmin;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to update super admin");
    }
  }
);
const initialState: SuperAdminState = {
  superAdmins: [],
  selectedSuperAdmin: null,
  loading: false,
  error: null,
};

const superAdminSlice = createSlice({

  name: "superAdmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchSuperAdmins
    builder
      .addCase(createSuperAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createSuperAdmin.fulfilled,
        (state, action: PayloadAction<SuperAdmin>) => {
          state.loading = false;
          state.superAdmins.push(action.payload);
        }
      )
      .addCase(createSuperAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(fetchSuperAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuperAdmins.fulfilled, (state, action: PayloadAction<SuperAdmin[]>) => {
        state.loading = false;
        state.superAdmins = action.payload;
      })
      .addCase(fetchSuperAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // fetchSuperAdminDetails
    builder
      .addCase(fetchSuperAdminDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuperAdminDetails.fulfilled, (state, action: PayloadAction<SuperAdmin>) => {
        state.loading = false;
        state.selectedSuperAdmin = action.payload;
      })
      .addCase(fetchSuperAdminDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // deleteSuperAdmin
    builder
      .addCase(deleteSuperAdmin.fulfilled, (state, action: PayloadAction<string>) => {
        state.superAdmins = state.superAdmins.filter((a) => a.id !== action.payload);
      })
      .addCase(deleteSuperAdmin.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // updateSuperAdmin
    builder
      .addCase(updateSuperAdmin.fulfilled, (state, action: PayloadAction<SuperAdmin>) => {
        state.selectedSuperAdmin = action.payload;
        state.superAdmins = state.superAdmins.map((a) =>
          a.id === action.payload.id ? action.payload : a
        );
      })
      .addCase(updateSuperAdmin.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default superAdminSlice.reducer;
