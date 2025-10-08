// import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
// import api from "../lib/axios";

// // Async Thunks 

// // Add Class
// export const addClass = createAsyncThunk(
//     "class/add",
//     async (payload: any, { rejectWithValue }) => {
//         try {
//             const res = await api.post("/class", payload);
//             return res.data;
//         } catch (err: any) {
//             return rejectWithValue(err.response?.data || err.message);
//         }
//     }
// );

// // Update Class
// export const updateClass = createAsyncThunk(
//     "class/update",
//     async (payload: any, { rejectWithValue }) => {
//         try {
//             const res = await api.put("/class", payload);
//             return res.data;
//         } catch (err: any) {
//             return rejectWithValue(err.response?.data || err.message);
//         }
//     }
// );

// // Delete Class
// export const deleteClass = createAsyncThunk(
//     "class/delete",
//     async (id: number, { rejectWithValue }) => {
//         try {
//             const res = await api.delete("/class", { data: { id } });
//             return { id, ...res.data };
//         } catch (err: any) {
//             return rejectWithValue(err.response?.data || err.message);
//         }
//     }
// );

// // Get Class Details
// export const getClassDetails = createAsyncThunk(
//     "class/getDetails",
//     async (id: string, { rejectWithValue }) => {
//         try {
//             const res = await api.get(`/class/${id}`);
//             return res.data;
//         } catch (err: any) {
//             return rejectWithValue(err.response?.data || err.message);
//         }
//     }
// );

// // Get All Classes of Own School
// export const getAllClassesBySchool = createAsyncThunk(
//     "class/getAllBySchool",
//     async (_, { rejectWithValue }) => {
//         try {
//             const res = await api.get(`/class/myclasses`);
//             return res.data;
//         } catch (err: any) {
//             return rejectWithValue(err.response?.data || err.message);
//         }
//     }
// );

// // Slice 

// interface ClassState {
//     classes: any[];
//     classDetails: any | null;
//     loading: boolean;
//     error: any;
// }

// const initialState: ClassState = {
//     classes: [],
//     classDetails: null,
//     loading: false,
//     error: null,
// };

// const classSlice = createSlice({
//     name: "class",
//     initialState,
//     reducers: {
//         clearClassDetails(state) {
//             state.classDetails = null;
//             state.error = null;
//         },
//     },
//     extraReducers: (builder) => {
//         // Add Class
//         builder.addCase(addClass.pending, (state) => {
//             state.loading = true;
//             state.error = null;
//         });
//         builder.addCase(addClass.fulfilled, (state, action: PayloadAction<any>) => {
//             state.loading = false;
//             state.classes.push(action.payload.data);
//         });
//         builder.addCase(addClass.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         });

//         // Update Class
//         builder.addCase(updateClass.pending, (state) => {
//             state.loading = true;
//             state.error = null;
//         });
//         builder.addCase(updateClass.fulfilled, (state, action: PayloadAction<any>) => {
//             state.loading = false;
//             state.classes = state.classes.map((cls) =>
//                 cls.id === action.payload.data.id ? action.payload.data : cls
//             );
//             if (state.classDetails?.id === action.payload.data.id) {
//                 state.classDetails = action.payload.data;
//             }
//         });
//         builder.addCase(updateClass.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         });

//         // Delete Class
//         builder.addCase(deleteClass.pending, (state) => {
//             state.loading = true;
//             state.error = null;
//         });
//         builder.addCase(deleteClass.fulfilled, (state, action: PayloadAction<any>) => {
//             state.loading = false;
//             state.classes = state.classes.filter((cls) => cls.id !== action.payload.id);
//             if (state.classDetails?.id === action.payload.id) {
//                 state.classDetails = null;
//             }
//         });
//         builder.addCase(deleteClass.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         });

//         // Get Class Details
//         builder.addCase(getClassDetails.pending, (state) => {
//             state.loading = true;
//             state.error = null;
//         });
//         builder.addCase(getClassDetails.fulfilled, (state, action: PayloadAction<any>) => {
//             state.loading = false;
//             state.classDetails = action.payload.data;
//         });
//         builder.addCase(getClassDetails.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         });

//         // Get All Classes
//         builder.addCase(getAllClassesBySchool.pending, (state) => {
//             state.loading = true;
//             state.error = null;
//         });
//         builder.addCase(getAllClassesBySchool.fulfilled, (state, action: PayloadAction<any>) => {
//             state.loading = false;
//             state.classes = action.payload.data;
//         });
//         builder.addCase(getAllClassesBySchool.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         });
//     },
// });

// export const { clearClassDetails } = classSlice.actions;

// export default classSlice.reducer;
