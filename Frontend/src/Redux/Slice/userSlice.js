import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    user: [],
    isAuthenticated: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, actions) => {
            state.user = actions.payload
        },
        setAuthenticated: (state, actions) => {
            state.isAuthenticated = actions.payload
        }
    }
})

export const { setUser, setAuthenticated } = userSlice.actions;
export default userSlice.reducer;