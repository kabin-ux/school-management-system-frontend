// import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
// import api from "../lib/axios";
// import type { EventForm } from "../types/events.types";

// // Types
// export interface Event {
//     id: string;
//     title: string;
//     description: string;
//     date: string;
//     startTime: string;
//     endTime: string;
//     target: string;
//     school_id: string;
//     eventType: string;
// }

// interface EventState {
//     events: Event[];
//     selectedEvent: Event | null;
//     loading: boolean;
//     error: string | null;
// }

// const initialState: EventState = {
//     events: [],
//     selectedEvent: null,
//     loading: false,
//     error: null,
// };

// // Thunks
// // Create Event
// export const createEvent = createAsyncThunk(
//     "events/createEvent",
//     async (eventData: EventForm, thunkAPI) => {
//         try {
//             const res = await api.post("/event", eventData);
//             return res.data.data; // matches ApiResponse.data
//         } catch (err: any) {
//             return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to create event");
//         }
//     }
// );

// // Delete Event
// export const deleteEvent = createAsyncThunk(
//     "events/deleteEvent",
//     async (id: string, thunkAPI) => {
//         try {
//             await api.delete(`/event`, { data: { id } });
//             return id;
//         } catch (err: any) {
//             return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to delete event");
//         }
//     }
// );

// // Get All Events
// export const getAllEventsBySchool = createAsyncThunk(
//     "events/getAllEventsBySchool",
//     async (target: string, thunkAPI) => {
//         try {
//             const res = await api.get("/event", {
//                 params: target ? { target } : {},
//             });
//             return res.data.data as Event[];
//         } catch (err: any) {
//             return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch events");
//         }
//     }
// );

// // Get Event Details
// export const getEventDetails = createAsyncThunk(
//     "events/getEventDetails",
//     async (id: string, thunkAPI) => {
//         try {
//             const res = await api.get(`/event/${id}`);
//             return res.data.data as Event;
//         } catch (err: any) {
//             return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch event details");
//         }
//     }
// );

// // Slice
// const eventSlice = createSlice({
//     name: "events",
//     initialState,
//     reducers: {
//         clearSelectedEvent: (state) => {
//             state.selectedEvent = null;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             // Create
//             .addCase(createEvent.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(createEvent.fulfilled, (state, action: PayloadAction<Event>) => {
//                 state.loading = false;
//                 state.events.push(action.payload);
//             })
//             .addCase(createEvent.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             })

//             // Delete
//             .addCase(deleteEvent.fulfilled, (state, action: PayloadAction<string>) => {
//                 state.events = state.events.filter((e) => e.id !== action.payload);
//             })

//             // Get All
//             .addCase(getAllEventsBySchool.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(getAllEventsBySchool.fulfilled, (state, action: PayloadAction<Event[]>) => {
//                 state.loading = false;
//                 state.events = action.payload;
//             })
//             .addCase(getAllEventsBySchool.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             })

//             // Get Details
//             .addCase(getEventDetails.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(getEventDetails.fulfilled, (state, action: PayloadAction<Event>) => {
//                 state.loading = false;
//                 state.selectedEvent = action.payload;
//             })
//             .addCase(getEventDetails.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             });
//     },
// });

// export const { clearSelectedEvent } = eventSlice.actions;
// export default eventSlice.reducer;
