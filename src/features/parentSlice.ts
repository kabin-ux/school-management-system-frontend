import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../lib/axios";

// Thunks

// Create Parent
export const addParent = createAsyncThunk(
  "parent/create",
  async (parentData: any, thunkAPI) => {
    try {
      const res = await api.post("/parent", parentData);
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data.error || err.message);
    }
  }
);

// Login Parent
export const loginParent = createAsyncThunk(
  "parent/login",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await api.post("/parent/login", credentials);
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data.error || err.message);
    }
  }
);

// Update Parent
export const updateParent = createAsyncThunk(
  "parent/update",
  async (updateData: any, thunkAPI) => {
    try {
      const res = await api.put("/parent", updateData);
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data.error || err.message);
    }
  }
);

// Get Parent Details
export const getParentDetails = createAsyncThunk(
  "parent/getDetails",
  async (id: number, thunkAPI) => {
    try {
      const res = await api.get(`/parent/${id}`);
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data.error || err.message);
    }
  }
);

// Link Student with Parent
export const linkStudentWithParent = createAsyncThunk(
  "parent/linkStudent",
  async (payload: { parentId: number; studentId: number }, thunkAPI) => {
    try {
      const res = await api.post("/parent/link-student", payload);
      return { parentId: payload.parentId, studentId: payload.studentId };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data.error || err.message);
    }
  }
);

// Unlink Student from Parent
export const unlinkStudentFromParent = createAsyncThunk(
  "parent/unlinkStudent",
  async (payload: { parentId: number; studentId: number }, thunkAPI) => {
    try {
      const res = await api.post("/parent/unlink-student", payload);
      return { parentId: payload.parentId, studentId: payload.studentId };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Delete Parent
export const deleteParent = createAsyncThunk(
  "parent/delete",
  async (id: number, thunkAPI) => {
    try {
      await api.delete("/parent", { data: { id } });
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get All Parents
export const getAllParents = createAsyncThunk(
  "parent/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/parent");
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get All Parents by Class
export const getAllParentsByClass = createAsyncThunk(
  "parent/getAllByClass",
  async (classId: number, thunkAPI) => {
    try {
      const res = await api.get(`/parent/class/${classId}`);
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Slice

interface ParentState {
  parents: any[];
  parentDetails: any | null;
  loggedInParent: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: ParentState = {
  parents: [],
  parentDetails: null,
  loggedInParent: null,
  loading: false,
  error: null,
};

const parentSlice = createSlice({
  name: "parent",
  initialState,
  reducers: {
    clearParentError(state) {
      state.error = null;
    },
    clearParentDetails(state) {
      state.parentDetails = null;
    },
    logoutParent(state) {
      state.loggedInParent = null;
    },
  },
  extraReducers: (builder) => {
    // Create Parent
    builder.addCase(addParent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addParent.fulfilled, (state, action) => {
      state.loading = false;
      state.parents.push(action.payload);
    });
    builder.addCase(addParent.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Login
    builder.addCase(loginParent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginParent.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedInParent = action.payload;
    });
    builder.addCase(loginParent.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update
    builder.addCase(updateParent.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.parents.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.parents[index] = action.payload;
      } else {
        state.parents.push(action.payload); // optional
      }
    });

    // Get Details
    builder.addCase(getParentDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.parentDetails = action.payload;
    });

    // Link Student
    builder.addCase(linkStudentWithParent.fulfilled, (state, action) => {
      state.loading = false;
      // optionally update local state
    });

    // Unlink Student
    builder.addCase(unlinkStudentFromParent.fulfilled, (state, action) => {
      state.loading = false;
      // optionally update local state
    });

    // Delete
    builder.addCase(deleteParent.fulfilled, (state, action) => {
      state.loading = false;
      state.parents = state.parents.filter((p: any) => p.id !== action.payload);
    });

    // Get All Parents
    builder.addCase(getAllParents.fulfilled, (state, action) => {
      state.loading = false;
      state.parents = action.payload;
    });

    // Get All Parents by Class
    builder.addCase(getAllParentsByClass.fulfilled, (state, action) => {
      state.loading = false;
      state.parents = action.payload;
    });
  },
});

export const { clearParentError, clearParentDetails, logoutParent } =
  parentSlice.actions;
export default parentSlice.reducer;
