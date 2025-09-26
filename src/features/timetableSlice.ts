import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import api from "../lib/axios";

// Async Thunks

//Create Timetable
export const createTimetable = createAsyncThunk(
  "timetable/create",
  async (payload: { classId: number; section?: string; name?: string }, { rejectWithValue }) => {
    try {
      const res = await api.post("/timetable", payload);
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Delete timetable
export const deleteTimetable = createAsyncThunk(
  "timetable/delete",
  async (id: string, thunkAPI) => {
    try {
      await api.delete(`/timetable/${id}`);
      return id; // return deleted id for reducer
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get all timetables by school
export const getAllTimetables = createAsyncThunk(
  "timetable/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/timetable");
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get timetable by classId
export const getTimetableByClassId = createAsyncThunk(
  "timetable/getByClassId",
  async (classId: string, thunkAPI) => {
    try {
      const res = await api.get(`/timetable/class/${classId}`);
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get timetable by section
export const getTimetableBySection = createAsyncThunk(
  "timetable/getBySection",
  async (sectionId: string, thunkAPI) => {
    try {
      const res = await api.get(`/timetable/section/${sectionId}`);
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get timetable by id
export const getTimetableById = createAsyncThunk(
  "timetable/getById",
  async (id: string, thunkAPI) => {
    try {
      const res = await api.get(`/timetable/${id}`);
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Slice

interface TimetableState {
  timetables: any[];
  selectedTimetable: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: TimetableState = {
  timetables: [],
  selectedTimetable: null,
  loading: false,
  error: null,
};

const timetableSlice = createSlice({
  name: "timetable",
  initialState,
  reducers: {
    clearSelectedTimetable: (state) => {
      state.selectedTimetable = null;
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
      state.timetables = action.payload;
    });
    builder.addCase(createTimetable.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // Delete timetable
    builder.addCase(deleteTimetable.fulfilled, (state, action) => {
      state.timetables = state.timetables.filter(
        (t) => t.id !== action.payload
      );
      if (state.selectedTimetable?.id === action.payload) {
        state.selectedTimetable = null;
      }
    });

    // Get all timetables
    builder.addCase(getAllTimetables.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllTimetables.fulfilled, (state, action) => {
      state.loading = false;
      state.timetables = action.payload;
    });
    builder.addCase(getAllTimetables.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get by classId
    builder.addCase(getTimetableByClassId.fulfilled, (state, action) => {
      state.loading = false;
      state.timetables = action.payload;
    });

    // Get by section
    builder.addCase(getTimetableBySection.fulfilled, (state, action) => {
      state.loading = false;
      state.timetables = action.payload;
    });

    // Get by id
    builder.addCase(getTimetableById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedTimetable = action.payload;
    });
  },
});

export const { clearSelectedTimetable } = timetableSlice.actions;
export default timetableSlice.reducer;
