import React from 'react';
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isAuthenticated: false,
    admin: {}
}

const UserSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setIsAuthenticated: (state, actions) => {
            state.isAuthenticated = actions.payload;
        },
        setAdmin: (state, actions) => {
            state.admin = actions.payload;
        },
    }
})

export const { setIsAuthenticated, setAdmin } = UserSlice.actions;
export default UserSlice.reducer;



