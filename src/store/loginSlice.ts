import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isConstructorDeclaration } from "typescript";
import server from "../api/server";

export enum UserStatur {
  Admin = "ADMIN",
  Normal = "NORMAL",
  Anonymous = "ANONYMOUS",
}

interface InitialStateInterface {
  showLoginModal: boolean;
  isLogin: Boolean;
  fetchLoginState: "idle" | "pending" | "fetched";
  errorMessage: string | null;
}

const initialState: InitialStateInterface = {
  showLoginModal: false,
  isLogin: false,
  fetchLoginState: "idle",
  errorMessage: null,
};

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const data = await server.post(
        "/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);
      return data.data;
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
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.fetchLoginState = "idle";
      state.errorMessage = "Email already exist";
    });
  },
});

export const { toogleLoginModal, logout } = loginSlice.actions;

export default loginSlice.reducer;
