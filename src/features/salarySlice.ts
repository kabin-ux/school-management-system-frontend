// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../lib/axios";
// import type { Salary, SalaryStructureForm } from "../types/fee-salary.types";

// // Thunks
// // Create Salary Structure
// export const createSalaryStructure = createAsyncThunk(
//     "salaryStructure/create",
//     async (data: any, thunkAPI) => {
//         try {
//             const res = await api.post("/salary", data);
//             return res.data.data;
//         } catch (err: any) {
//             return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
//         }
//     }
// );

// // Update Salary Structure
// export const updateSalaryStructure = createAsyncThunk(
//     "salaryStructure/update",
//     async ({ id, data }: { id: string; data: SalaryStructureForm }, thunkAPI) => {
//         try {
//             console.log("edit salaryy",data)
//             const res = await api.put(`/salary/${id}`, data);
//             return res.data.data;
//         } catch (err: any) {
//             return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
//         }
//     }
// );

// // Get All Salary Structures for My School
// export const getMySchoolSalaryStructures = createAsyncThunk(
//     "salaryStructure/getAll",
//     async (_, thunkAPI) => {
//         try {
//             const res = await api.get("/salary/my-school");
//             return res.data.data;
//         } catch (err: any) {
//             return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
//         }
//     }
// );

// // Delete Salary Structure
// export const deleteSalaryStructure = createAsyncThunk(
//     "salaryStructure/delete",
//     async (id: number, thunkAPI) => {
//         try {
//             await api.delete("/salary", { data: { id } });
//             return id; // return deleted ID for local state update
//         } catch (err: any) {
//             return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
//         }
//     }
// );

// // Get Salary Structure by ID
// export const getSalaryStructureById = createAsyncThunk(
//     "salaryStructure/getById",
//     async (id: number, thunkAPI) => {
//         try {
//             const res = await api.get(`/salary/${id}`);
//             return res.data.data;
//         } catch (err: any) {
//             return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
//         }
//     }
// );

// // Slice
// interface SalaryStructureState {
//     isLoading: boolean;
//     error: string | null;
//     successMessage: string | null;
//     salaryStructures: Salary[];
//     selectedSalaryStructure: Salary | null;
// }

// const initialState: SalaryStructureState = {
//     isLoading: false,
//     error: null,
//     successMessage: null,
//     salaryStructures: [],
//     selectedSalaryStructure: null,
// };

// const salaryStructureSlice = createSlice({
//     name: "salaryStructure",
//     initialState,
//     reducers: {
//         clearSalaryStructureState: (state) => {
//             state.isLoading = false;
//             state.error = null;
//             state.successMessage = null;
//             state.selectedSalaryStructure = null;
//         },
//     },
//     extraReducers: (builder) => {
//         // Create
//         builder.addCase(createSalaryStructure.pending, (state) => {
//             state.isLoading = true;
//             state.error = null;
//         });
//         builder.addCase(createSalaryStructure.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.successMessage = "Salary structure created successfully!";
//             state.salaryStructures.push(action.payload);
//         });
//         builder.addCase(createSalaryStructure.rejected, (state, action) => {
//             state.isLoading = false;
//             state.error = action.payload as string;
//         });

//         // Update
//         builder.addCase(updateSalaryStructure.pending, (state) => {
//             state.isLoading = true;
//             state.error = null;
//         });
//         builder.addCase(updateSalaryStructure.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.successMessage = "Salary structure updated successfully!";
//             state.salaryStructures = state.salaryStructures.map((s) =>
//                 s.id === action.payload.id ? action.payload : s
//             );
//         });
//         builder.addCase(updateSalaryStructure.rejected, (state, action) => {
//             state.isLoading = false;
//             state.error = action.payload as string;
//         });

//         // Get All
//         builder.addCase(getMySchoolSalaryStructures.pending, (state) => {
//             state.isLoading = true;
//             state.error = null;
//         });
//         builder.addCase(getMySchoolSalaryStructures.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.salaryStructures = action.payload;
//         });
//         builder.addCase(getMySchoolSalaryStructures.rejected, (state, action) => {
//             state.isLoading = false;
//             state.error = action.payload as string;
//         });

//         // Delete
//         builder.addCase(deleteSalaryStructure.pending, (state) => {
//             state.isLoading = true;
//             state.error = null;
//         });
//         builder.addCase(deleteSalaryStructure.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.successMessage = "Salary structure deleted successfully!";
//             state.salaryStructures = state.salaryStructures.filter(
//                 (s: any) => s.id !== action.payload
//             );
//         });
//         builder.addCase(deleteSalaryStructure.rejected, (state, action) => {
//             state.isLoading = false;
//             state.error = action.payload as string;
//         });

//         // Get By ID
//         builder.addCase(getSalaryStructureById.pending, (state) => {
//             state.isLoading = true;
//             state.error = null;
//         });
//         builder.addCase(getSalaryStructureById.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.selectedSalaryStructure = action.payload;
//         });
//         builder.addCase(getSalaryStructureById.rejected, (state, action) => {
//             state.isLoading = false;
//             state.error = action.payload as string;
//         });
//     },
// });

// export const { clearSalaryStructureState } = salaryStructureSlice.actions;
// export default salaryStructureSlice.reducer;
