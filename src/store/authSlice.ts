import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginRequest } from "@/lib/actions";

export type AuthStatus = "idle" | "loading" | "authenticated" | "failed";

export interface AuthState {
  user: string | null;
  name: string | null;
  role: string | null;
  status: AuthStatus;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  name: null,
  role: null,
  status: "idle",
  error: null,
};

export type LoginCredentials = {
  userId: string;
  password: string;
  remember?: boolean;
};

/**
 * Login thunk. Calls the `loginRequest` Server Action, which validates the
 * credentials and sets the HTTP-only session cookie (so the proxy/middleware
 * guard keeps working). Redux holds the client-side auth state for the UI.
 */
export const login = createAsyncThunk<
  { userId: string; name: string; role: string },
  LoginCredentials,
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  const res = await loginRequest(credentials);
  if (!res.ok) {
    return rejectWithValue(res.error);
  }
  return { userId: res.userId, name: res.name, role: res.role };
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: { payload: string | null }) {
      state.user = action.payload;
      state.status = action.payload ? "authenticated" : "idle";
    },
    logout(state) {
      state.user = null;
      state.name = null;
      state.role = null;
      state.status = "idle";
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.user = action.payload.userId;
        state.name = action.payload.name;
        state.role = action.payload.role;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Something went wrong. Please try again.";
      });
  },
});

export const { setUser, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
