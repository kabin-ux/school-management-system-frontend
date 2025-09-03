import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import api from "../lib/axios";
import type { SchoolData } from "../components/SuperAdmin/partnerschools/AddSchoolModal";

// interface School {
//     id: string;
//     name: string;
//     email: string;
//     contact: string;
//     status: string;
//     school_code: string;
//     [key: string]: any;
// }

interface SchoolState {
    schools: SchoolData[];       // all schools list
    currentSchool: SchoolData | null; // selected school details
    loading: boolean;
    error: string | null;
}

// ------------------ Thunks ------------------ //

// Get All Schools
export const getAllSchools = createAsyncThunk(
    "school/getAllSchools",
    async (_, thunkAPI) => {
        try {
            const res = await api.get(`/school`, {
                withCredentials: true,

                headers: {
                    'x-client-type': 'web'
                }
            });
            return res.data.data as SchoolData[];
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Error fetching schools"
            );
        }
    }
);

// Get Single School Details
export const getSchoolDetails = createAsyncThunk(
    "school/getSchoolDetails",
    async (id: string, thunkAPI) => {
        try {
            const res = await api.get(`/school/${id}`, {
                withCredentials: true,
                headers: {
                    'x-client-type': 'web'
                }
            });
            return res.data.data as SchoolData;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Error fetching school details"
            );
        }
    }
);

export const updateSchoolInfo = createAsyncThunk(
    "school/updateSchoolInfo",
    async (schoolInfo: { id: string; updates: Record<string, any> }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/school`, {
                ...schoolInfo.updates,
                id: schoolInfo.id, // backend expects id inside body
            });
            return response.data.data; // returning updated school
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update school info"
            );
        }
    }
);

export const deleteSchool = createAsyncThunk(
    "school/deleteSchool",
    async (schoolId: string | undefined, thunkAPI) => {
        try {
            await api.delete("/school", {
                data: { schoolId },
            });
            return schoolId;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to delete school"
            );
        }
    }
);

// Change Password
export const changeSchoolPassword = createAsyncThunk(
    "school/changePassword",
    async (data: { oldPassword: string; newPassword: string }, thunkAPI) => {
        try {
            const res = await api.put(`/school/change-password`, data, {
                withCredentials: true,
            });
            return res.data.message;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Error changing password"
            );
        }
    }
);

// Send Password Reset Mail
export const sendMailForPasswordReset = createAsyncThunk(
    "school/sendPasswordResetMail",
    async (email: string, thunkAPI) => {
        try {
            const res = await api.post(`/school/password-reset-mail`, { email });
            return res.data.message;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Error sending reset mail"
            );
        }
    }
);

// Reset School Password
export const resetSchoolPassword = createAsyncThunk(
    "school/resetPassword",
    async (data: { token: string; newPassword: string }, thunkAPI) => {
        try {
            const res = await api.put(`/school/password-reset`, data);
            return res.data.message;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Error resetting password"
            );
        }
    }
);

// Change School Status
export const changeSchoolStatus = createAsyncThunk(
    "school/changeStatus",
    async ({ id, status }: { id: string; status: string }, thunkAPI) => {
        try {
            const res = await api.put(`/school/change-status/${id}`, { status });
            return res.data.data as SchoolData;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Error changing status"
            );
        }
    }
);

// Add School (SuperAdmin)
export const addSchoolBySuperAdmin = createAsyncThunk(
    "school/addSchool",
    async (schoolData: SchoolData, { rejectWithValue }) => {
        try {
            const res = await api.post(`/school`, schoolData, { withCredentials: true });
            return res.data.data as SchoolData;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Error adding school"
            );
        }
    }
);

// Slice 
const initialState: SchoolState = {
    schools: [],
    currentSchool: null,
    loading: false,
    error: null,
};

const schoolSlice = createSlice({
    name: "school",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearCurrentSchool: (state) => {
            state.currentSchool = null;
        },
    },
    extraReducers: (builder) => {
        // Get All Schools
        builder
            .addCase(getAllSchools.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllSchools.fulfilled, (state, action: PayloadAction<SchoolData[]>) => {
                state.loading = false;
                state.schools = action.payload;
            })
            .addCase(getAllSchools.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Get Single School
        builder
            .addCase(getSchoolDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSchoolDetails.fulfilled, (state, action: PayloadAction<SchoolData>) => {
                state.loading = false;
                state.currentSchool = action.payload;
            })
            .addCase(getSchoolDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(updateSchoolInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateSchoolInfo.fulfilled, (state, action) => {
                state.loading = false;
                // update the modified school in the state
                const updatedSchool = action.payload;
                console.log("updats sc", updatedSchool)
                const index = state.schools.findIndex((s: any) => s.id === updatedSchool.id);
                console.log("index", index)
                if (index !== -1) {
                    state.schools[index] = updatedSchool;
                }
                // Update currentAccountant if it matches
                if (state.currentSchool && state.currentSchool.id === updatedSchool.id) {
                    state.currentSchool = { ...state.currentSchool, ...updatedSchool };
                }
            })
            .addCase(updateSchoolInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(deleteSchool.fulfilled, (state, action) => {
                state.schools = state.schools.filter(
                    (school) => school.id !== action.payload
                );
            })
        // Change Status
        builder.addCase(changeSchoolStatus.fulfilled, (state, action: PayloadAction<SchoolData>) => {
            state.currentSchool = action.payload;
            state.schools = state.schools.map((s) =>
                s.id === action.payload.id ? action.payload : s
            );
        });

        // Add School
        builder.addCase(addSchoolBySuperAdmin.fulfilled, (state, action: PayloadAction<SchoolData>) => {
            state.schools.push(action.payload);
        });
    },
});

export const { clearError, clearCurrentSchool } = schoolSlice.actions;
export default schoolSlice.reducer;
