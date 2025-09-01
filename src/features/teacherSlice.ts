import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import api from "../lib/axios";

// ==================== Thunks ====================

// Get All Teachers
export const getAllTeachers = createAsyncThunk(
    "teacher/getAllTeachers",
    async (_, thunkAPI) => {
        try {
            const res = await api.get("/teacher");
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch teachers");
        }
    }
);

// Add Teacher
export const addTeacher = createAsyncThunk(
    "teacher/addTeacher",
    async (teacherData: any, thunkAPI) => {
        try {
            const res = await api.post("/teacher", teacherData);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to add teacher");
        }
    }
);

// Update Teacher Info
export const updateTeacher = createAsyncThunk(
    "teacher/updateTeacher",
    async (teacherData: any, thunkAPI) => {
        try {
            const res = await api.put(`/teacher/${teacherData.id}`, teacherData);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update teacher");
        }
    }
);

// Delete Teacher
export const deleteTeacher = createAsyncThunk(
    "teacher/deleteTeacher",
    async (teacherId: number, thunkAPI) => {
        try {
            await api.delete(`/teacher/${teacherId}`);
            return teacherId;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete teacher");
        }
    }
);

// Teacher Logout
export const logoutTeacher = createAsyncThunk(
    "teacher/logoutTeacher",
    async (_, thunkAPI) => {
        try {
            const res = await api.post("/teacher/logout");
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Logout failed");
        }
    }
);

// ==================== Slice ====================

interface TeacherState {
    teachers: any[];
    loading: boolean;
    error: string | null;
}

const initialState: TeacherState = {
    teachers: [],
    loading: false,
    error: null,
};

const teacherSlice = createSlice({
    name: "teacher",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Get All
        builder.addCase(getAllTeachers.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getAllTeachers.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.teachers = action.payload?.data || [];
        });
        builder.addCase(getAllTeachers.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Add
        builder.addCase(addTeacher.fulfilled, (state, action: PayloadAction<any>) => {
            state.teachers.push(action.payload?.data);
        });

        // Update
        builder.addCase(updateTeacher.fulfilled, (state, action: PayloadAction<any>) => {
            state.teachers = state.teachers.map((t) =>
                t.id === action.payload?.data.id ? action.payload?.data : t
            );
        });

        // Delete
        builder.addCase(deleteTeacher.fulfilled, (state, action: PayloadAction<any>) => {
            state.teachers = state.teachers.filter((t) => t.id !== action.payload);
        });

        // Logout
        builder.addCase(logoutTeacher.fulfilled, (state) => {
            state.teachers = [];
        });
    },
});

export default teacherSlice.reducer;
