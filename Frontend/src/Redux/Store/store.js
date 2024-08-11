import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../Slice/userSlice';

const loadState = () => {
    try {
        const saveData = localStorage.getItem("user")
        if (saveData === null) {
            return undefined
        }
        return JSON.parse(saveData)

    } catch (err) {
        return undefined
    }
}

const saveState = (state) => {
    try {
        const { isAuthenticated, user } = state.userSlice;
        const saveData = JSON.stringify({
            userSlice: { isAuthenticated, user }
        })
        localStorage.setItem("user", saveData)

    } catch (err) {
        console.log("fail to saveState", err);

    }
}

const persistedState = loadState()

export const store = configureStore({
    reducer: {
        userSlice
    },
    preloadedState: persistedState
})

store.subscribe(() => {
    saveState(store.getState())
})