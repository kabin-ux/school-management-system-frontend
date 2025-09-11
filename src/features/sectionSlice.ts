import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import api from "../lib/axios";

// Thunks

// Create Section
export const createSection = createAsyncThunk(
  "section/create",
  async (sectionData: { class_id: number; section_name: string }, thunkAPI) => {
    try {
      const res = await api.post("/section", sectionData);
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get All  by Class
export const getSectionsByClass = createAsyncThunk(
  "section/getByClass",
  async (classId: string, thunkAPI) => {
    try {
      const res = await api.get(`/section/class/${classId}`);
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get Section Details
export const getSectionDetails = createAsyncThunk(
  "section/getDetails",
  async (id: number, thunkAPI) => {
    try {
      const res = await api.get(`/section/${id}`);
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update Section
export const updateSection = createAsyncThunk(
  "section/update",
  async (updateData: { id: number; section_name: string }, thunkAPI) => {
    try {
      const res = await api.put("/section", updateData);
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Delete Section
export const deleteSection = createAsyncThunk(
  "section/delete",
  async (id: number, thunkAPI) => {
    try {
      await api.delete("/section", { data: { id } });
      return id; // return deleted section id
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Slice

interface SectionState {
  sections: any[];
  sectionDetails: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: SectionState = {
  sections: [],
  sectionDetails: null,
  loading: false,
  error: null,
};

const sectionSlice = createSlice({
  name: "section",
  initialState,
  reducers: {
    clearSectionError(state) {
      state.error = null;
    },
    clearSectionDetails(state) {
      state.sectionDetails = null;
    },
  },
  extraReducers: (builder) => {
    // Create
    builder.addCase(createSection.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createSection.fulfilled, (state, action) => {
      state.loading = false;
      state.sections.push(action.payload);
    });
    builder.addCase(createSection.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Get All By Class
    builder.addCase(getSectionsByClass.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getSectionsByClass.fulfilled, (state, action) => {
      state.loading = false;
      state.sections = action.payload;
    });
    builder.addCase(getSectionsByClass.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Get Details
    builder.addCase(getSectionDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getSectionDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.sectionDetails = action.payload;
    });
    builder.addCase(getSectionDetails.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update
    builder.addCase(updateSection.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateSection.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.sections.findIndex(
        (s: any) => s.id === action.payload.id
      );
      if (index !== -1) state.sections[index] = action.payload;
    });
    builder.addCase(updateSection.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete
    builder.addCase(deleteSection.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteSection.fulfilled, (state, action) => {
      state.loading = false;
      state.sections = state.sections.filter(
        (s: any) => s.id !== action.payload
      );
    });
    builder.addCase(deleteSection.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearSectionError, clearSectionDetails } = sectionSlice.actions;
export default sectionSlice.reducer;
