// import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
// import api from "../lib/axios";
// import type { Subject, SubjectForm } from "../types/class.types";

// interface SubjectState {
//   subjects: Subject[];
//   subjectsByClass: Subject[];
//   selectedSubject: Subject | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: SubjectState = {
//   subjects: [],
//   subjectsByClass: [],
//   selectedSubject: null,
//   loading: false,
//   error: null,
// };

// // Async tunks

// // Add Subject
// export const addSubject = createAsyncThunk(
//   "subjects/addSubject",
//   async (subjectData: { name: string; code?: string | null }, thunkAPI) => {
//     try {
//       const res = await api.post("/subject", subjectData);
//       return res.data.data;
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // Add Subjects Bulk
// export const addSubjectsBulk = createAsyncThunk(
//   "subjects/addSubjectsBulk",
//   async (subjects: { name: string; code?: string | null }[], thunkAPI) => {
//     try {
//       const res = await api.post("/subject/bulk", subjects);
//       return res.data.data;
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // Get All Subjects
// export const getAllSubjects = createAsyncThunk(
//   "subjects/getAllSubjects",
//   async (_, thunkAPI) => {
//     try {
//       const res = await api.get("/subject");
//       return res.data.data;
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // Get All Subjects
// export const getAllSubjectsByClass = createAsyncThunk(
//   "subjects/getAllSubjectsByClass",
//   async (id: string, thunkAPI) => {
//     try {
//       const res = await api.get(`/subject/class/${id}`);
//       return res.data.data;
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // Get Subject by ID
// export const getSubjectById = createAsyncThunk(
//   "subjects/getSubjectById",
//   async (id: string, thunkAPI) => {
//     try {
//       const res = await api.get(`/subject/${id}`);
//       return res.data.data;
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // Get Subjects by IDs
// export const getSubjectsByIds = createAsyncThunk(
//   "subjects/getSubjectsByIds",
//   async (ids: string[], thunkAPI) => {
//     try {
//       const res = await api.post(`/subject/by-ids`, { ids });
//       return res.data.data;
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // Search Subjects
// export const searchSubjects = createAsyncThunk(
//   "subjects/searchSubjects",
//   async (query: string, thunkAPI) => {
//     try {
//       const res = await api.get(`/subject/search?query=${query}`);
//       return res.data.data;
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // Update Subject
// export const updateSubject = createAsyncThunk(
//   "subjects/updateSubject",
//   async (
//     { id, updates }: { id: string; updates: SubjectForm },
//     thunkAPI
//   ) => {
//     try {
//       console.log("id subject", id)
//       const res = await api.put(`/subject/${id}`, updates);
//       return res.data.data;
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // Delete Subject
// export const deleteSubject = createAsyncThunk(
//   "subjects/deleteSubject",
//   async (id: string, thunkAPI) => {
//     try {
//       await api.delete(`/subject/${id}`);
//       return id;
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// //  Assign subjects to teacher
// export const assignSubjectsToTeacher = createAsyncThunk(
//   "subjects/assignTeacher",
//   async (
//     { teacherId, subjectId }: { teacherId: string; subjectId: string },
//     thunkAPI
//   ) => {
//     try {
//       const res = await api.put(`/subject/assign-teacher`, {
//         subjectId,
//         teacherId
//       });
//       return res.data; // message + status
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || err.message
//       );
//     }
//   }
// );

// // Slice
// const subjectSlice = createSlice({
//   name: "subjects",
//   initialState,
//   reducers: {
//     clearSelectedSubject: (state) => {
//       state.selectedSubject = null;
//     },
//   },
//   extraReducers: (builder) => {
//     // Add Subject
//     builder.addCase(addSubject.fulfilled, (state, action: PayloadAction<Subject>) => {
//       state.subjectsByClass.push(action.payload);
//       state.loading = false;
//     });

//     // Add Bulk
//     builder.addCase(addSubjectsBulk.fulfilled, (state, action: PayloadAction<Subject[]>) => {
//       state.subjectsByClass = [...state.subjectsByClass, ...action.payload];
//       state.loading = false;
//     });

//     // Get All
//     builder.addCase(getAllSubjects.fulfilled, (state, action: PayloadAction<Subject[]>) => {
//       state.subjects = action.payload;
//       state.loading = false;
//     });

//     builder.addCase(getAllSubjectsByClass.fulfilled, (state, action: PayloadAction<Subject[]>) => {
//       state.subjectsByClass = action.payload; // ✅ use correct field
//       state.loading = false;
//     });

//     // Get by ID
//     builder.addCase(getSubjectById.fulfilled, (state, action: PayloadAction<Subject>) => {
//       state.selectedSubject = action.payload;
//       state.loading = false;
//     });

//     // Get by IDs
//     builder.addCase(getSubjectsByIds.fulfilled, (state, action: PayloadAction<Subject[]>) => {
//       state.subjects = action.payload;
//       state.loading = false;
//     });

//     // Search
//     builder.addCase(searchSubjects.fulfilled, (state, action: PayloadAction<Subject[]>) => {
//       state.subjects = action.payload;
//       state.loading = false;
//     });

//     // Update
//     builder.addCase(updateSubject.fulfilled, (state, action: PayloadAction<Subject>) => {
//       const idx = state.subjectsByClass.findIndex((s) => s.id === action.payload.id);
//       if (idx !== -1) state.subjectsByClass[idx] = action.payload;
//       if (state.selectedSubject?.id === action.payload.id) {
//         state.selectedSubject = action.payload;
//       }
//       state.loading = false;
//     });

//     // Delete
//     builder.addCase(deleteSubject.fulfilled, (state, action: PayloadAction<string>) => {
//       state.subjects = state.subjects.filter((s) => s.id !== action.payload);
//       state.loading = false;
//     });

//     builder.addCase(assignSubjectsToTeacher.fulfilled, (state) => {
//       state.loading = false;
//       state.error = null;
//     });

//     // Handle pending and rejected
//     builder.addMatcher((action) => action.type.startsWith("subjects/") && action.type.endsWith("/pending"), (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addMatcher((action) => action.type.startsWith("subjects/") && action.type.endsWith("/rejected"), (state, action: any) => {
//       state.loading = false;
//       state.error = action.payload;
//     });
//   },
// });

// export const { clearSelectedSubject } = subjectSlice.actions;
// export default subjectSlice.reducer;
