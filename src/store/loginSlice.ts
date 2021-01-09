import { createSlice,PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

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
        connectUserWithDB: (state,{payload}:PayloadAction<{id:string}>)=>{
            axios.post("http://ds-ecommers.herokuapp.com/connectUser",{
                id:payload.id
            })
            return state;
        }
    },
});

export const { toogleLoginModal,connectUserWithDB } = loginSlice.actions;

export default loginSlice.reducer;
