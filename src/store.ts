import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./redux/features/users";
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
    reducer: {
        user: userReducer
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
