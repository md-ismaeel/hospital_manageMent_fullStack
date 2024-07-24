import { configureStore } from "@reduxjs/toolkit"
import UserSlice from "../Slice/userSlice"

export const store = configureStore({
    reducer: {
        UserSlice
    }
})