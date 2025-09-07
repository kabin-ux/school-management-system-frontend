import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../lib/axios";

// Async Thunks

// Create
export const createTransportation = createAsyncThunk(
  "transportation/create",
  async (data: any, thunkAPI) => {
    try {
      const res = await api.post("/transportation", data);
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update
export const updateTransportation = createAsyncThunk(
  "transportation/update",
  async (data: any, thunkAPI) => {
    try {
      const res = await api.put("/transportation", data);
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get All
export const getAllTransportation = createAsyncThunk(
  "transportation/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/transportation");
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get By Id
export const getTransportationById = createAsyncThunk(
  "transportation/getById",
  async (id: number, thunkAPI) => {
    try {
      const res = await api.get(`/transportation/${id}`);
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Delete
export const deleteTransportation = createAsyncThunk(
  "transportation/delete",
  async (id: string, thunkAPI) => {
    try {
      await api.delete("/transportation", { data: { id } });
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Assign to Student
export const assignTransportationToStudent = createAsyncThunk(
  "transportation/assignToStudent",
  async (
    payload: { studentId: number; transportationId: number },
    thunkAPI
  ) => {
    try {
      const res = await api.post("/transportation/assign", payload);
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Unassign from Student
export const unassignTransportationFromStudent = createAsyncThunk(
  "transportation/unassignFromStudent",
  async (payload: { studentId: number }, thunkAPI) => {
    try {
      const res = await api.post("/transportation/unassign", payload);
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Slice

interface TransportationState {
  items: any[];
  selected: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: TransportationState = {
  items: [],
  selected: null,
  loading: false,
  error: null,
};

const transportationSlice = createSlice({
  name: "transportation",
  initialState,
  reducers: {
    clearTransportationError(state) {
      state.error = null;
    },
    clearSelectedTransportation(state) {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    // Create
    builder.addCase(createTransportation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTransportation.fulfilled, (state, action) => {
      state.loading = false;
      state.items.push(action.payload);
    });
    builder.addCase(createTransportation.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update
    builder.addCase(updateTransportation.fulfilled, (state, action) => {
      state.loading = false;
      const idx = state.items.findIndex((t: any) => t.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    });

    // Get All
    builder.addCase(getAllTransportation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllTransportation.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(getAllTransportation.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Get By Id
    builder.addCase(getTransportationById.fulfilled, (state, action) => {
      state.loading = false;
      state.selected = action.payload;
    });

    // Delete
    builder.addCase(deleteTransportation.fulfilled, (state, action) => {
      state.loading = false;
      state.items = state.items.filter((t: any) => t.id !== action.payload);
    });

    // Assign
    builder.addCase(assignTransportationToStudent.fulfilled, (state, action) => {
      state.loading = false;
      state.selected = action.payload; // updated student info
    });

    // Unassign
    builder.addCase(unassignTransportationFromStudent.fulfilled, (state, action) => {
      state.loading = false;
      state.selected = action.payload; // updated student info
    });
  },
});

export const { clearTransportationError, clearSelectedTransportation } =
  transportationSlice.actions;

export default transportationSlice.reducer;
