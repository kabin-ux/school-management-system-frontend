// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../lib/axios";
// import type { AuthState } from "../types/auth";

// export const loginSuperAdmin = createAsyncThunk(
//   "auth/loginSuperAdmin",
//   async (credentials: { email: string; password: string }, thunkAPI) => {
//     try {
//       const res = await api.post("/super-admin/login", credentials);
//       return res.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
//     }
//   }
// );

// export const loginAdmin = createAsyncThunk(
//   "auth/loginAdmin",
//   async (
//     { email, password, rememberMe }: { email: string; password: string; rememberMe: boolean },
//     thunkAPI
//   ) => {
//     try {
//       const res = await api.post("/school/login", { email, password });

//       if (rememberMe) {
//         localStorage.setItem("rememberMe", "true");
//       } else {
//         localStorage.removeItem("rememberMe");
//       }

//       return res.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Login failed"
//       );
//     }
//   }
// );

// export const loginAccountant = createAsyncThunk(
//   "auth/loginAccountant",
//   async (credentials: { email: string; password: string }, thunkAPI) => {
//     try {
//       const res = await api.post("/accountant/login", credentials);
//       return res.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
//     }
//   }
// );

// export const logoutSuperAdmin = createAsyncThunk(
//   "auth/logoutSuperAdmin",
//   async (_, thunkAPI) => {
//     try {
//       const res = await api.get("/super-admin/logout"); // endpoint from your backend
//       // clear local state if needed
//       return res.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Failed to logout"
//       );
//     }
//   }
// );

// export const logoutSchool = createAsyncThunk(
//   "auth/logoutSchool",
//   async (_, thunkAPI) => {
//     try {
//       const res = await api.get("/school/logout"); // endpoint from your backend
//       // clear local state if needed
//       return res.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Failed to logout"
//       );
//     }
//   }
// );

// export const logoutAccountant = createAsyncThunk(
//   "auth/logoutAccountant",
//   async (_, thunkAPI) => {
//     try {
//       const res = await api.get("/accountant/logout"); // endpoint from your backend
//       // clear local state if needed
//       return res.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Failed to logout"
//       );
//     }
//   }
// );

// // Change Super Admin Password
// export const changeSuperAdminPassword = createAsyncThunk(
//   "auth/changeSuperAdminPassword",
//   async (passwordData: { oldPassword: string; newPassword: string; confirmPassword: string }, thunkAPI) => {
//     try {
//       const res = await api.post("/super-admin/change-password", passwordData);
//       return res.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to change password");
//     }
//   }
// );

// // Send Mail for Password Reset
// export const sendPasswordResetMail = createAsyncThunk(
//   "auth/sendSuperAdminPasswordResetMail",
//   async (emailData: { email: string }, thunkAPI) => {
//     try {
//       const res = await api.post("/super-admin/password-reset-mail", emailData);
//       return res.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to send reset mail");
//     }
//   }
// );

// // Reset Super Admin Password
// export const resetSuperAdminPassword = createAsyncThunk(
//   "auth/resetSuperAdminPassword",
//   async (
//     payload: { token: string; id: string; password: string; confirmPassword: string },
//     thunkAPI
//   ) => {
//     try {
//       const { token, id, ...passwordData } = payload;
//       const res = await api.post(`/super-admin/password-reset?token=${token}&id=${id}`, passwordData);
//       return res.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to reset password");
//     }
//   }
// );

// const initialState: AuthState = {
//   user: null,
//   role: null,
//   token: null,
//   loading: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     loadUser: (state) => {
//       const rememberMe = localStorage.getItem("rememberMe");
//       const token = rememberMe ? localStorage.getItem("token") : null;

//       if (token) {
//         state.token = token;
//         // optional: decode JWT or fetch user profile
//         state.user = { token };
//       }
//     },

//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginSuperAdmin.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginSuperAdmin.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.data;
//         state.token = action.payload.token;
//         state.role = "superadmin";
//         localStorage.setItem("auth", JSON.stringify(action.payload.data));
//       })
//       .addCase(loginSuperAdmin.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(loginAdmin.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginAdmin.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.data;
//         state.token = action.payload.token;
//         state.role = "admin";
//         localStorage.setItem("auth", JSON.stringify(action.payload.data));
//       })
//       .addCase(loginAdmin.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(loginAccountant.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginAccountant.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.data;
//         state.token = action.payload.token;
//         state.role = "accountant";
//         localStorage.setItem("auth", JSON.stringify(action.payload.data));
//       })
//       .addCase(loginAccountant.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(logoutSuperAdmin.fulfilled, (state) => {
//         state.user = null;
//         state.role = null;
//         state.token = null;
//         localStorage.removeItem("auth");
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(logoutSuperAdmin.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(logoutSchool.fulfilled, (state) => {
//         state.user = null;
//         state.role = null;
//         state.token = null;
//         localStorage.removeItem("auth");
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(logoutSchool.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(logoutAccountant.fulfilled, (state) => {
//         state.user = null;
//         state.role = null;
//         state.token = null;
//         localStorage.removeItem("auth");
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(logoutAccountant.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//     builder
//       .addCase(changeSuperAdminPassword.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(changeSuperAdminPassword.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(changeSuperAdminPassword.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });

//     // Send Password Reset Mail
//     builder
//       .addCase(sendPasswordResetMail.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(sendPasswordResetMail.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(sendPasswordResetMail.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })

//       // Reset Super Admin Password
//       .addCase(resetSuperAdminPassword.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(resetSuperAdminPassword.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(resetSuperAdminPassword.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export default authSlice.reducer;
