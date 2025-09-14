import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import api from "../lib/axios";

// Async Thunks
// Add Fees Structure
export const addFeesStructure = createAsyncThunk(
    "feeStructure/add",
    async (feesData: any, thunkAPI) => {
        try {
            const res = await api.post("/fees", feesData);
            return res.data.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Update Fees Structure
export const updateFeesStructure = createAsyncThunk(
    "feeStructure/update",
    async (feesData: any, thunkAPI) => {
        try {
            const res = await api.put("/fees", feesData);
            return res.data.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Delete Fees Structure
export const deleteFeesStructure = createAsyncThunk(
    "feeStructure/delete",
    async (id: string, thunkAPI) => {
        try {
            await api.delete("/fees", { data: { id } });
            return id;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Get My School Fees Structures
export const getMySchoolFeesStructures = createAsyncThunk(
    "feeStructure/getMySchool",
    async (_, thunkAPI) => {
        try {
            const res = await api.get(`/fees/my-school`);
            return res.data.data.feesStructures;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Get Fees Structure By Id
export const getFeesStructureById = createAsyncThunk(
    "feeStructure/getById",
    async (id: number, thunkAPI) => {
        try {
            const res = await api.get(`/fees/${id}`);
            return res.data.data.feesStructure;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Get All Schools Fees Structures
export const getAllSchoolsFeesStructures = createAsyncThunk(
    "feeStructure/getAllSchools",
    async (_, thunkAPI) => {
        try {
            const res = await api.get("/fees");
            return res.data.data.feesStructures;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Slice

interface FeeStructureState {
    feeStructures: any[];
    mySchoolFeeStructures: any[];
    selectedFeeStructure: any | null;
    loading: boolean;
    error: string | null;
}

const initialState: FeeStructureState = {
    feeStructures: [],
    mySchoolFeeStructures: [],
    selectedFeeStructure: null,
    loading: false,
    error: null,
};

const feeStructureSlice = createSlice({
    name: "feeStructure",
    initialState,
    reducers: {
        clearFeeStructureError(state) {
            state.error = null;
        },
        clearSelectedFeeStructure(state) {
            state.selectedFeeStructure = null;
        },
    },
    extraReducers: (builder) => {
        // Add
        builder.addCase(addFeesStructure.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addFeesStructure.fulfilled, (state, action: PayloadAction<FeeStructureState>) => {
            state.loading = false;
            state.mySchoolFeeStructures.push(action.payload);
        });
        builder.addCase(addFeesStructure.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Update
        builder.addCase(updateFeesStructure.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateFeesStructure.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.mySchoolFeeStructures.findIndex(
                (f: any) => f.id === action.payload.id
            );
            if (index !== -1) state.mySchoolFeeStructures[index] = action.payload;
        });
        builder.addCase(updateFeesStructure.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Delete
        builder.addCase(deleteFeesStructure.fulfilled, (state, action) => {
            state.loading = false;
            state.feeStructures = state.feeStructures.filter(
                (f: any) => f.id !== action.payload
            );
            state.mySchoolFeeStructures = state.mySchoolFeeStructures.filter(
                (f: any) => f.id !== action.payload
            );
        });

        // Get My School Fees Structures
        builder.addCase(getMySchoolFeesStructures.fulfilled, (state, action) => {
            state.loading = false;
            state.mySchoolFeeStructures = action.payload;
        });

        // Get Fees Structure By Id
        builder.addCase(getFeesStructureById.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedFeeStructure = action.payload;
        });

        // Get All Schools Fees Structures
        builder.addCase(getAllSchoolsFeesStructures.fulfilled, (state, action) => {
            state.loading = false;
            state.feeStructures = action.payload;
        });
    },
});

export const { clearFeeStructureError, clearSelectedFeeStructure } =
    feeStructureSlice.actions;
export default feeStructureSlice.reducer;
