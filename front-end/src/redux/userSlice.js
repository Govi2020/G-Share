import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, payload) => {
            state.loading = false;
            state.currentUser = payload.payload;
        },
        loginFailure: (state,err) => {
            state.loading = false;
            state.error = true;
        },
        registerStart: (state) => {
            state.loading = true;
        },
        registerSuccess: (state, payload) => {
            state.loading = false;
            state.currentUser = payload.payload;
        },
        registerFailure: (state,err) => {
            state.loading = false;
            state.error = true;
        },
        logoutUser: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginFailure, logoutUser,registerStart,registerSuccess,registerFailure } =
    userSlice.actions;
export default userSlice.reducer;
