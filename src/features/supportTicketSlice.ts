import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import api from "../lib/axios";
import type { SupportTicket } from "../types/support.types";

interface SupportTicketState {
    tickets: SupportTicket[];
    selectedTicket: SupportTicket | null;
    loading: boolean;
    loadingClose: boolean;
    error: string | null;
}

const initialState: SupportTicketState = {
    tickets: [],
    selectedTicket: null,
    loading: false,
    loadingClose: false,
    error: null,
};

// Create Support Ticket
export const createSupportTicket = createAsyncThunk(
    "supportTickets/create",
    async (ticketData: Partial<SupportTicket>, thunkAPI) => {
        try {
            const res = await api.post("/support", ticketData);
            return res.data.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// Accept Ticket
export const acceptSupportTicket = createAsyncThunk(
    "supportTickets/accept",
    async (id: string, thunkAPI) => {
        try {
            const res = await api.put(`/support/accept/${id}`);
            return res.data.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// Resolve Ticket
export const resolveSupportTicket = createAsyncThunk(
    "supportTickets/resolve",
    async (id: string, thunkAPI) => {
        try {
            const res = await api.put(`/support/resolve/${id}`);
            return res.data.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// Close Ticket
export const closeSupportTicket = createAsyncThunk(
    "supportTickets/close",
    async (id: string, thunkAPI) => {
        try {
            const res = await api.put(`/support/close/${id}`);
            return res.data.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// Get All Tickets
export const getAllSupportTickets = createAsyncThunk(
    "supportTickets/getAll",
    async (_, thunkAPI) => {
        try {
            const res = await api.get("/support");
            return res.data.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// Get Ticket by ID
export const getSupportTicketById = createAsyncThunk(
    "supportTickets/getById",
    async (id: string, thunkAPI) => {
        try {
            const res = await api.get(`/support/${id}`);
            return res.data.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const getSupportTicketBySchool = createAsyncThunk(
    "supportTickets/getBYSchool",
    async (id: string, thunkAPI) => {
        try {
            const res = await api.get(`/support/my-school/?id=${id}`);
            return res.data.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// Delete Ticket
export const deleteSupportTicket = createAsyncThunk(
    "supportTickets/delete",
    async (id: string, thunkAPI) => {
        try {
            await api.delete(`/support`, {
                data: { id }
            });
            return id;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// Slice
const supportTicketSlice = createSlice({
    name: "supportTickets",
    initialState,
    reducers: {
        clearSelectedTicket: (state) => {
            state.selectedTicket = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Create
            .addCase(createSupportTicket.pending, (state) => {
                state.loading = true;
            })
            .addCase(createSupportTicket.fulfilled, (state, action: PayloadAction<SupportTicket>) => {
                state.loading = false;
                state.tickets.unshift(action.payload);
            })
            .addCase(createSupportTicket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Accept / Resolve / Close
            .addCase(acceptSupportTicket.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(acceptSupportTicket.fulfilled, (state, action: PayloadAction<SupportTicket>) => {
                state.loading = false;
                state.tickets = state.tickets.map((t) => (t.id === action.payload.id ? action.payload : t));
            })
            .addCase(acceptSupportTicket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(resolveSupportTicket.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(resolveSupportTicket.fulfilled, (state, action: PayloadAction<SupportTicket>) => {
                state.loading = false;
                state.tickets = state.tickets.map((t) => (t.id === action.payload.id ? action.payload : t));
            })
            .addCase(resolveSupportTicket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(closeSupportTicket.pending, (state) => {
                state.loadingClose = true;
                state.error = null
            })
            .addCase(closeSupportTicket.fulfilled, (state, action: PayloadAction<SupportTicket>) => {
                state.loadingClose = false;
                state.tickets = state.tickets.map((t) => (t.id === action.payload.id ? action.payload : t));
            })
            .addCase(closeSupportTicket.rejected, (state, action) => {
                state.loadingClose = false;
                state.error = action.payload as string;
            })

            // Get All
            .addCase(getAllSupportTickets.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllSupportTickets.fulfilled, (state, action: PayloadAction<SupportTicket[]>) => {
                state.loading = false;
                state.tickets = action.payload;
            })
            .addCase(getAllSupportTickets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Get By Id
            .addCase(getSupportTicketById.fulfilled, (state, action: PayloadAction<SupportTicket>) => {
                state.selectedTicket = action.payload;
            })

            // Delete
            .addCase(deleteSupportTicket.fulfilled, (state, action: PayloadAction<string>) => {
                state.tickets = state.tickets.filter((t) => t.id !== action.payload);
            })

              // Get School
            .addCase(getSupportTicketBySchool.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSupportTicketBySchool.fulfilled, (state, action: PayloadAction<SupportTicket[]>) => {
                state.loading = false;
                state.tickets = action.payload;
            })
            .addCase(getSupportTicketBySchool.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearSelectedTicket } = supportTicketSlice.actions;
export default supportTicketSlice.reducer;
