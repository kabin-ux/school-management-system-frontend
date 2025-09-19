import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import api from "../lib/axios";

//  Thunks 

export const createTimetable = createAsyncThunk(
  "timetable/create",
  async (payload: { classId: number; section?: string; name?: string }, { rejectWithValue }) => {
    try {
      const res = await api.post("/timetables", payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getTimetable = createAsyncThunk(
  "timetable/get",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await api.get(`/timetables/${id}`);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const upsertPeriods = createAsyncThunk(
  "timetable/upsertPeriods",
  async (params: { id: number; items: any[] }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/timetables/${params.id}/periods`, { items: params.items });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deletePeriod = createAsyncThunk(
  "timetable/deletePeriod",
  async (params: { id: number; periodId: number }, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/timetables/${params.id}/periods/${params.periodId}`);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getActiveTimetableForClass = createAsyncThunk(
  "timetable/getActiveForClass",
  async (classId: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/classes/${classId}/timetable/active`);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

//  Slice 

interface TimetableState {
  current: any | null;
  activeForClass: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: TimetableState = {
  current: null,
  activeForClass: null,
  loading: false,
  error: null,
};

const timetableSlice = createSlice({
  name: "timetable",
  initialState,
  reducers: {
    clearTimetable: (state) => {
      state.current = null;
      state.activeForClass = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Create
    builder.addCase(createTimetable.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createTimetable.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.current = action.payload;
    });
    builder.addCase(createTimetable.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get Timetable
    builder.addCase(getTimetable.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getTimetable.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.current = action.payload;
    });
    builder.addCase(getTimetable.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Upsert Periods
    builder.addCase(upsertPeriods.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(upsertPeriods.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.current = {
        ...state.current,
        periods: action.payload?.periods || [],
      };
    });
    builder.addCase(upsertPeriods.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete Period
    builder.addCase(deletePeriod.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deletePeriod.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      // remove from periods if available
      if (state.current?.periods) {
        state.current.periods = state.current.periods.filter(
          (p: any) => p.id !== action.payload?.deletedId
        );
      }
    });
    builder.addCase(deletePeriod.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get Active Timetable for Class
    builder.addCase(getActiveTimetableForClass.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getActiveTimetableForClass.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.activeForClass = action.payload;
    });
    builder.addCase(getActiveTimetableForClass.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearTimetable } = timetableSlice.actions;
export default timetableSlice.reducer;
