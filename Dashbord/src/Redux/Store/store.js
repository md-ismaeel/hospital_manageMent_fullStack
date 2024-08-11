import { configureStore } from "@reduxjs/toolkit"
import UserSlice from "../Slice/userSlice"

const loadState = () => {
    try {
        const saveData = localStorage.getItem("user");
        if (saveData === null) {
            return undefined
        }
        return JSON.parse(saveData)

    } catch (err) {
        return undefined;
    }
}

const saveState = (state) => {
    try {
        const { isAuthenticated, admin } = state.UserSlice;
        const savedData = JSON.stringify({
            UserSlice: { isAuthenticated, admin }
        })

        localStorage.setItem("user", savedData)
    } catch (err) {
        console.log("failed to saveSate", err);

    }
}

const persistedState = loadState()

export const store = configureStore({
    reducer: {
        UserSlice
    },
    preloadedState: persistedState, // Initialize with persisted state from localStorage
})

// Subscribe to store state changes to save to localStorage
store.subscribe(() => {
    saveState(store.getState());
});