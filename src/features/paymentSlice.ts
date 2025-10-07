import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../lib/axios";

// Async Thunks
// Create payment (auto or manual)
export const createPayment = createAsyncThunk(
  "payment/createPayment",
  async (_, thunkAPI) => {
    try {
      const res = await api.post("/payment");
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Create payment school-wise
export const createPaymentSchoolWise = createAsyncThunk(
  "payment/createPaymentSchoolWise",
  async (_, thunkAPI) => {
    try {
      const res = await api.post("/payment/school-wise");
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get all payments (optionally filtered)
export const getAllPayments = createAsyncThunk(
  "payment/getAllPayments",
  async (_, thunkAPI) => {
    try {
      const params = new URLSearchParams().toString();
      const res = await api.get(`/payment?${params}`);
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get fees info of a particular student
export const getFeesInfoOfStudent = createAsyncThunk(
  "payment/getFeesInfoOfStudent",
  async (studentId: string, thunkAPI) => {
    try {
      const res = await api.get(`/payment/student/${studentId}`);
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Clear payment (mark as completed)
export const clearFeePayment = createAsyncThunk(
  "payment/clearFeePayment",
  async (id: string, thunkAPI) => {
    try {
      const res = await api.put(`/payment/clear/${id}`);
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Change payment status
export const changePaymentStatus = createAsyncThunk(
  "payment/changePaymentStatus",
  async (statusInfo: { paymentId: string; status: string }, thunkAPI) => {
    try {
      const res = await api.put("/payment/status", statusInfo);
      return { id: statusInfo.paymentId, status: statusInfo.status };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get payment details by ID
export const getPaymentDetails = createAsyncThunk(
  "payment/getPaymentDetails",
  async (id: string, thunkAPI) => {
    try {
      const res = await api.get(`/payment/${id}`);
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Delete single payment info
export const deletePaymentInfo = createAsyncThunk(
  "payment/deletePaymentInfo",
  async (id: string, thunkAPI) => {
    try {
      await api.delete(`/payment/${id}`);
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Delete all payments (testing only)
export const deleteAllPayments = createAsyncThunk(
  "payment/deleteAllPayments",
  async (_, thunkAPI) => {
    try {
      await api.delete("/payment");
      return true;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Slice

interface PaymentState {
  payments: any[];
  selectedPayment: any | null;
  studentPayments: any[];
  loading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  payments: [],
  selectedPayment: null,
  studentPayments: [],
  loading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    clearSelectedPayment: (state) => {
      state.selectedPayment = null;
    },
  },
  extraReducers: (builder) => {
    // CREATE PAYMENT
    builder.addCase(createPayment.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createPayment.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createPayment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(createPaymentSchoolWise.fulfilled, (state) => {
      state.loading = false;
    });

    // FETCH ALL PAYMENTS
    builder.addCase(getAllPayments.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllPayments.fulfilled, (state, action) => {
      state.loading = false;
      state.payments = action.payload;
    });
    builder.addCase(getAllPayments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // FETCH STUDENT PAYMENTS
    builder.addCase(getFeesInfoOfStudent.fulfilled, (state, action) => {
      state.loading = false;
      state.studentPayments = action.payload;
    });

    // CLEAR PAYMENT
    builder.addCase(clearFeePayment.fulfilled, (state, action) => {
      const updated = state.payments.map((p) =>
        p.id === action.payload?.id
          ? { ...p, status: "COMPLETED" }
          : p
      );
      state.payments = updated;
    });

    // CHANGE PAYMENT STATUS
    builder.addCase(changePaymentStatus.fulfilled, (state, action) => {
      const updated = state.payments.map((p) =>
        p.id === action.payload.id
          ? { ...p, status: action.payload.status }
          : p
      );
      state.payments = updated;
    });

    // GET PAYMENT DETAILS
    builder.addCase(getPaymentDetails.fulfilled, (state, action) => {
      state.selectedPayment = action.payload;
    });

    // DELETE SINGLE PAYMENT
    builder.addCase(deletePaymentInfo.fulfilled, (state, action) => {
      state.payments = state.payments.filter((p) => p.id !== action.payload);
    });

    // DELETE ALL PAYMENTS
    builder.addCase(deleteAllPayments.fulfilled, (state) => {
      state.payments = [];
    });
  },
});

export const { clearSelectedPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
