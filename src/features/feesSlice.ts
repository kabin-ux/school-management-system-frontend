// import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
// import api from "../lib/axios";
// import type { FeeStructureAttributes } from "../types/fee-salary.types";

// // Async Thunks

// // Add Fees Structure
// export const addFeesStructure = createAsyncThunk<
//     FeeStructureAttributes, // return type
//     any,                   // argument type
//     { rejectValue: string }
// >("feeStructure/add", async (feesData, thunkAPI) => {
//     try {
//         const res = await api.post("/fees", feesData);
//         return res.data.data as FeeStructureAttributes;
//     } catch (err: any) {
//         return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
// });

// // Update Fees Structure
// export const updateFeesStructure = createAsyncThunk<
//     FeeStructureAttributes,
//     any,
//     { rejectValue: string }
// >("feeStructure/update", async (feesData, thunkAPI) => {
//     try {
//         const res = await api.put("/fees", feesData);
//         return res.data.data as FeeStructureAttributes;
//     } catch (err: any) {
//         return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
// });

// // Delete Fees Structure
// export const deleteFeesStructure = createAsyncThunk<
//     string, // return just the id
//     string,
//     { rejectValue: string }
// >("feeStructure/delete", async (id, thunkAPI) => {
//     try {
//         await api.delete("/fees", { data: { id } });
//         return id;
//     } catch (err: any) {
//         return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
// });

// // Get My School Fees Structures
// export const getMySchoolFeesStructures = createAsyncThunk<
//     FeeStructureAttributes[],
//     void,
//     { rejectValue: string }
// >("feeStructure/getMySchool", async (_, thunkAPI) => {
//     try {
//         const res = await api.get(`/fees/my-school`);
//         console.log(res.data.data.feeStructures)
//         return res.data.data as FeeStructureAttributes[];
//     } catch (err: any) {
//         return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
// });

// // Get Fees Structure By Id
// export const getFeesStructureById = createAsyncThunk<
//     FeeStructureAttributes,
//     number,
//     { rejectValue: string }
// >("feeStructure/getById", async (id, thunkAPI) => {
//     try {
//         const res = await api.get(`/fees/${id}`);
//         return res.data.data.feesStructure as FeeStructureAttributes;
//     } catch (err: any) {
//         return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
// });

// // Get All Schools Fees Structures
// export const getAllSchoolsFeesStructures = createAsyncThunk<
//     FeeStructureAttributes[],
//     void,
//     { rejectValue: string }
// >("feeStructure/getAllSchools", async (_, thunkAPI) => {
//     try {
//         const res = await api.get("/fees");
//         return res.data.data.feesStructures as FeeStructureAttributes[];
//     } catch (err: any) {
//         return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
// });

// // Slice

// interface FeeStructureState {
//     feeStructures: FeeStructureAttributes[];
//     selectedFeeStructure: FeeStructureAttributes | null;
//     loading: boolean;
//     error: string | null;
// }

// const initialState: FeeStructureState = {
//     feeStructures: [],
//     selectedFeeStructure: null,
//     loading: false,
//     error: null,
// };

// const feeStructureSlice = createSlice({
//     name: "feeStructure",
//     initialState,
//     reducers: {
//         clearFeeStructureError(state) {
//             state.error = null;
//         },
//         clearSelectedFeeStructure(state) {
//             state.selectedFeeStructure = null;
//         },
//     },
//     extraReducers: (builder) => {
//         // Add
//         builder.addCase(addFeesStructure.pending, (state) => {
//             state.loading = true;
//         });
//         builder.addCase(addFeesStructure.fulfilled, (state, action: PayloadAction<FeeStructureAttributes>) => {
//             state.loading = false;
//             state.feeStructures.push(action.payload);
//         });
//         builder.addCase(addFeesStructure.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload as string;
//         });

//         // Update
//         builder.addCase(updateFeesStructure.pending, (state) => {
//             state.loading = true;
//         });
//         builder.addCase(updateFeesStructure.fulfilled, (state, action: PayloadAction<FeeStructureAttributes>) => {
//             state.loading = false;
//             const index = state.feeStructures.findIndex((f) => f.id === action.payload.id);
//             if (index !== -1) state.feeStructures[index] = action.payload;
//         });
//         builder.addCase(updateFeesStructure.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload as string;
//         });

//         // Delete
//         builder.addCase(deleteFeesStructure.pending, (state) => {
//             state.loading = true;
//         });
//         builder.addCase(deleteFeesStructure.fulfilled, (state, action: PayloadAction<string>) => {
//             state.loading = false;
//             state.feeStructures = state.feeStructures.filter((f) => f.id !== action.payload);
//         });
//         builder.addCase(deleteFeesStructure.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload as string;
//         });

//         // Get My School
//         builder.addCase(getMySchoolFeesStructures.pending, (state) => {
//             state.loading = true;
//         });
//         builder.addCase(getMySchoolFeesStructures.fulfilled, (state, action: PayloadAction<FeeStructureAttributes[]>) => {
//             state.loading = false;
//             state.feeStructures = action.payload;
//         });
//         builder.addCase(getMySchoolFeesStructures.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload as string;
//         });

//         // Get By Id
//         builder.addCase(getFeesStructureById.pending, (state) => {
//             state.loading = true;
//         });
//         builder.addCase(getFeesStructureById.fulfilled, (state, action: PayloadAction<FeeStructureAttributes>) => {
//             state.loading = false;
//             state.selectedFeeStructure = action.payload;
//         });
//         builder.addCase(getFeesStructureById.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload as string;
//         });

//         // Get All Schools
//         builder.addCase(getAllSchoolsFeesStructures.pending, (state) => {
//             state.loading = true;
//         });
//         builder.addCase(getAllSchoolsFeesStructures.fulfilled, (state, action: PayloadAction<FeeStructureAttributes[]>) => {
//             state.loading = false;
//             state.feeStructures = action.payload;
//         });
//         builder.addCase(getAllSchoolsFeesStructures.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload as string;
//         });
//     },
// });

// export const { clearFeeStructureError, clearSelectedFeeStructure } = feeStructureSlice.actions;
// export default feeStructureSlice.reducer;
