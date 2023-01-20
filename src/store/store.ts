import { configureStore } from "@reduxjs/toolkit"
import authenticationReducer from "./authenticationSlice"
import funfactSlice from "./funfactSlice"
import contactInfoSlice from "./contactInfoSlice"
import techSlice from "./techSlice"
import projectSlice from "./projectSlice"

export const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        funfactSlice: funfactSlice,
        contactInfoSlice: contactInfoSlice,
        techSlice: techSlice,
        projectSlice: projectSlice
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch