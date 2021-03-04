import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import server from "../api/server";

export enum UserStatur {
  Admin = "ADMIN",
  Normal = "NORMAL",
  Anonymous = "ANONYMOUS",
}

interface InitialStateInterface {
  showLoginModal: boolean;
  isLogin: Boolean;
  token: null | string;
  fetchLoginState: "idle" | "pending" | "fetched";
  errorMessage: string | null;
}

const initialState: InitialStateInterface = {
  showLoginModal: false,
  isLogin: false,
  token: null,
  fetchLoginState: "idle",
  errorMessage: null,
};

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      console.log(email, password);
      const { data } = await server.post("/user/login", {
        email,
        password,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const { data } = await server.post("/user/register", {
        email,
        password,
      });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toogleLoginModal: (state) => {
      state.showLoginModal = !state.showLoginModal;
    },
    logout: (state) => {
      state.token = null;
      state.isLogin = false;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.fetchLoginState = "pending";
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.isLogin = true;
      state.fetchLoginState = "fetched";
      state.token = payload.token;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.fetchLoginState = "idle";
      state.errorMessage = "Wrong Email or Password";
    });

    builder.addCase(registerUser.pending, (state) => {
      state.fetchLoginState = "pending";
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.isLogin = true;
      state.fetchLoginState = "fetched";
      state.token = payload.token;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.fetchLoginState = "idle";
      state.errorMessage = "Email already exist";
    });
  },
});

export const { toogleLoginModal, logout } = loginSlice.actions;

export default loginSlice.reducer;
