import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import api from "../lib/axios";

//  TYPES 
export interface AttendanceData {
  date: string;
  count: number;
}

export interface ClassWiseAttendanceData {
  date: string;
  class_id: string;
  class_name: string;
  count: number;
}

export interface SchoolAdminDashboard {
  totalClasses: number;
  totalStudents: number;
  totalTeachers: number;
  totalParents: number;
  totalAccountant: number;
  totalSupportTicket: number;
  last7DaysAttendanceGraphData: AttendanceData[];
  last7DaysClassWiseAttendanceGraphData: ClassWiseAttendanceData[];
}

export interface SuperAdminDashboard {
  totalSchools: number;
  totalStudents: number;
  totalTeachers: number;
  totalAccountants: number;
  totalParents: number;
}

interface DashboardState {
  schoolAdmin: SchoolAdminDashboard | null;
  superAdmin: SuperAdminDashboard | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  schoolAdmin: null,
  superAdmin: null,
  loading: false,
  error: null,
};

//  ASYNC THUNKS 
// Get School Admin Dashboard
export const getSchoolAdminDashboard = createAsyncThunk(
  "dashboard/getSchoolAdminDashboard",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/dashboard/school");
      return res.data.data as SchoolAdminDashboard;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// Get Super Admin Dashboard
export const getSuperAdminGeneralDashboard = createAsyncThunk(
  "dashboard/getSuperAdminGeneralDashboard",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/dashboard/super-admin");
      return res.data.data as SuperAdminDashboard;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// SLICE 
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearDashboard: (state) => {
      state.schoolAdmin = null;
      state.superAdmin = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // --- School Admin Dashboard ---
    builder.addCase(
      getSchoolAdminDashboard.fulfilled,
      (state, action: PayloadAction<SchoolAdminDashboard>) => {
        state.schoolAdmin = action.payload;
        state.loading = false;
      }
    );

    // --- Super Admin Dashboard ---
    builder.addCase(
      getSuperAdminGeneralDashboard.fulfilled,
      (state, action: PayloadAction<SuperAdminDashboard>) => {
        state.superAdmin = action.payload;
        state.loading = false;
      }
    );

    // Handle pending and rejected
    builder.addMatcher(
      (action) =>
        action.type.startsWith("dashboard/") && action.type.endsWith("/pending"),
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );
    builder.addMatcher(
      (action) =>
        action.type.startsWith("dashboard/") && action.type.endsWith("/rejected"),
      (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

export const { clearDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
