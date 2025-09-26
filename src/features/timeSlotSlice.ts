import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../lib/axios";

// Async Thunks

// Create time slot
export const createTimeSlot = createAsyncThunk(
    "timeSlot/create",
    async (data: any, thunkAPI) => {
        try {
            const res = await api.post("/timeslot", data);
            return res.data.data; // ApiResponse.data
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Update time slot
export const updateTimeSlot = createAsyncThunk(
    "timeSlot/update",
    async ({ id, data }: { id: string; data: any }, thunkAPI) => {
        try {
            const res = await api.put(`/timeslot/${id}`, data);
            return res.data.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Delete time slot
export const deleteTimeSlot = createAsyncThunk(
    "timeSlot/delete",
    async (id: string, thunkAPI) => {
        try {
            await api.delete(`/timeslot/${id}`);
            return id;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Get time slot by id
export const getTimeSlotById = createAsyncThunk(
    "timeSlot/getById",
    async (id: string, thunkAPI) => {
        try {
            const res = await api.get(`/timeslot/${id}`);
            return res.data.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Change tag of time slot
export const changeTimeSlotTag = createAsyncThunk(
    "timeSlot/changeTag",
    async ({ id, tag }: { id: string; tag: string }, thunkAPI) => {
        try {
            const res = await api.patch(`/timeslot/${id}/tag`, { tag });
            return res.data.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Get all time slots by timetableId
export const getAllTimeSlotsByTimetableId = createAsyncThunk(
    "timeSlot/getAllByTimetableId",
    async (timetableId: string, thunkAPI) => {
        try {
            const res = await api.get(`/timeslot/timetable/${timetableId}`);
            return res.data.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Slice

interface TimeSlotState {
    slots: any[];
    selectedSlot: any | null;
    loading: boolean;
    error: string | null;
}

const initialState: TimeSlotState = {
    slots: [],
    selectedSlot: null,
    loading: false,
    error: null,
};

const timeSlotSlice = createSlice({
    name: "timeSlot",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Create
        builder.addCase(createTimeSlot.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createTimeSlot.fulfilled, (state, action) => {
            state.loading = false;
            state.slots.push(action.payload);
        });
        builder.addCase(createTimeSlot.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Update
        builder.addCase(updateTimeSlot.fulfilled, (state, action) => {
            state.loading = false;
            state.slots = state.slots.map((slot) =>
                slot.id === action.payload.id ? action.payload : slot
            );
            if (state.selectedSlot?.id === action.payload.id) {
                state.selectedSlot = action.payload;
            }
        });

        // Delete
        builder.addCase(deleteTimeSlot.fulfilled, (state, action) => {
            state.slots = state.slots.filter((slot) => slot.id !== action.payload);
            if (state.selectedSlot?.id === action.payload) {
                state.selectedSlot = null;
            }
        });

        // Get by ID
        builder.addCase(getTimeSlotById.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedSlot = action.payload;
        });

        // Change tag
        builder.addCase(changeTimeSlotTag.fulfilled, (state, action) => {
            state.loading = false;
            state.slots = state.slots.map((slot) =>
                slot.id === action.payload.id ? action.payload : slot
            );
            if (state.selectedSlot?.id === action.payload.id) {
                state.selectedSlot = action.payload;
            }
        });

        // Get all by timetableId
        builder.addCase(getAllTimeSlotsByTimetableId.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getAllTimeSlotsByTimetableId.fulfilled, (state, action) => {
            state.loading = false;
            state.slots = action.payload;
        });
        builder.addCase(getAllTimeSlotsByTimetableId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export default timeSlotSlice.reducer;
