import { useState } from 'react';
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isAuthenticated: false,
    admin: {},
    appointments: [],
    doctor: [],
    messages: []
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
        setAppointments: (state, actions) => {
            state.appointments = actions.payload || [];
        },
        setDoctor: (state, actions) => {
            state.doctor = actions.payload;
        },
        setMessage: (state, actions) => {
            state.messages = actions.payload
        }
    }
})

export const { setIsAuthenticated, setAdmin, setAppointments, setMessage, setDoctor } = UserSlice.actions;
export default UserSlice.reducer;



