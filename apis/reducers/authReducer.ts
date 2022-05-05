import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../libs/account-type";
import { authenticate } from "../account-api";
import { LoginRequest } from "../models/account";

export type StateTypes = {
    account: User | null,
}

const initialState: StateTypes = {
    account: null,
}

export const login = createAsyncThunk('auth/login', async (req: LoginRequest) => {
    const response = (await authenticate(req)).data;
    const data = response.data;
    return data;
})


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            localStorage && localStorage.clear();
            return { ...state, account: null }
        }
    },
    extraReducers(builder) {
        builder
        .addCase(login.fulfilled, (state, action) => {
            localStorage && localStorage.setItem('user', JSON.stringify(action.payload));
            return{...state, account: action.payload}
        })
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;