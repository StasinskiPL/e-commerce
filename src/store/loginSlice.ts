import { createSlice } from "@reduxjs/toolkit";

export enum UserStatur {
    Admin = "ADMIN",
    Normal = "NORMAL",
    Anonymous = "ANONYMOUS",
}

interface InitialStateInterface {
    user:
    | {
        email: string;
        id: string;
        type: Omit<UserStatur, UserStatur.Anonymous>;
    }
    | UserStatur.Anonymous;
    showLoginModal: boolean;
}

const initialState: InitialStateInterface = {
    user: UserStatur.Anonymous,
    showLoginModal: false,
};

const loginSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        toogleLoginModal: (state) => {
            state.showLoginModal = !state.showLoginModal;
        },
    },
});

export const { toogleLoginModal } = loginSlice.actions;

export default loginSlice.reducer;
