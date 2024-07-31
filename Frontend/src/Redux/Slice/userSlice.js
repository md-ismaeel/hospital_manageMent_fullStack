import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    user: {},
    isAuthenticated: false
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
        }
    }
})

export const { setUser, setIsAuthenticated } = userSlice.actions;
export default userSlice.reducer;