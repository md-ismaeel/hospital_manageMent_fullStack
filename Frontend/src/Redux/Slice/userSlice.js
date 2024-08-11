import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    user: {},
    isAuthenticated: false,
    doctors: [],
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, actions) => {
            state.user = actions.payload
        },
        setIsAuthenticated: (state, actions) => {
            state.isAuthenticated = actions.payload
        },
        setDoctors: (state, actions) => {
            state.doctors = actions.payload || []
        }
    }
})

export const { setUser, setIsAuthenticated, setDoctors } = userSlice.actions;
export default userSlice.reducer;