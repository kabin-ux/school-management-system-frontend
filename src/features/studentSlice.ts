// import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
// import api from "../lib/axios";
// import type { Student, StudentForm } from "../types/student.types";

// // Define types
// // export interface Student {
// //   id: number;
// //   name: string;
// //   email: string;
// //   age: number;
// //   [key: string]: any;
// // }

// interface StudentState {
//   students: Student[];
//   studentDetails: Student | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: StudentState = {
//   students: [],
//   studentDetails: null,
//   loading: false,
//   error: null,
// };

// // Thunks
// export const addStudent = createAsyncThunk(
//   "students/addStudent",
//   async (studentData: Partial<Student>, thunkAPI) => {
//     try {
//       const res = await api.post("/student", studentData);
//       return res.data.data; // from ApiResponse
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to add student");
//     }
//   }
// );

// export const updateStudent = createAsyncThunk(
//   "students/updateStudent",
//   async ({ id, updates }: { id: string; updates: Partial<StudentForm> }, thunkAPI) => {
//     try {
//       const res = await api.put(`/student/${id}`, updates);
//       return res.data.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update student");
//     }
//   }
// );

// export const getStudents = createAsyncThunk(
//   "students/getStudents",
//   async (_, thunkAPI) => {
//     try {
//       const res = await api.get("/student");
//       return res.data.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch students");
//     }
//   }
// );

// export const getStudentsBySchool = createAsyncThunk(
//   "students/getStudentsBySchool",
//   async (_, thunkAPI) => {
//     try {
//       const res = await api.get("/student/by-school");
//       return res.data.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch students");
//     }
//   }
// );

// export const getStudentById = createAsyncThunk(
//   "students/getStudentById",
//   async (id: string, thunkAPI) => {
//     try {
//       const res = await api.get(`/student/${id}`);
//       return res.data.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch student");
//     }
//   }
// );

// export const deleteStudent = createAsyncThunk(
//   "students/deleteStudent",
//   async (id: string, thunkAPI) => {
//     try {
//       await api.delete(`/student/${id}`);
//       return id; // return deleted student's id to remove from state
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response?.data?.error || "Failed to delete student");
//     }
//   }
// );

// // Slice
// const studentSlice = createSlice({
//   name: "students",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     // Add Student
//     builder
//       .addCase(addStudent.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addStudent.fulfilled, (state, action: PayloadAction<Student>) => {
//         state.loading = false;
//         state.students.push(action.payload);
//       })
//       .addCase(addStudent.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });

//     // Update Student
//     builder
//       .addCase(updateStudent.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateStudent.fulfilled, (state, action: PayloadAction<Student>) => {
//         state.loading = false;
//         const index = state.students.findIndex((s) => s.id === action.payload.id);
//         if (index !== -1) {
//           state.students[index] = action.payload;
//         }
//       })
//       .addCase(updateStudent.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });

//     // Get Students
//     builder
//       .addCase(getStudents.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getStudents.fulfilled, (state, action: PayloadAction<Student[]>) => {
//         state.loading = false;
//         state.students = action.payload;
//       })
//       .addCase(getStudents.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });

//     // Get Students By School
//     builder
//       .addCase(getStudentsBySchool.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getStudentsBySchool.fulfilled, (state, action: PayloadAction<Student[]>) => {
//         state.loading = false;
//         state.students = action.payload;
//       })
//       .addCase(getStudentsBySchool.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });

//     // Get Student by ID
//     builder
//       .addCase(getStudentById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getStudentById.fulfilled, (state, action: PayloadAction<Student>) => {
//         state.loading = false;
//         state.studentDetails = action.payload;
//       })
//       .addCase(getStudentById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });

//     // Delete Student
//     builder
//       .addCase(deleteStudent.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteStudent.fulfilled, (state, action: PayloadAction<string>) => {
//         state.loading = false;
//         state.students = state.students.filter((s) => s.id !== action.payload);
//       })
//       .addCase(deleteStudent.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export default studentSlice.reducer;
