import { createSlice } from "@reduxjs/toolkit";

interface IntialProps
{
    user: any;
}

const initialState: IntialProps = {
    user: {}
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, { payload }) =>
        {
            state.user = payload;
        },
        logoutUser: (state, { payload }) =>
        {
            state.user = {};
        }
    }
});


export const { addUser, logoutUser } = userSlice.actions;


export default userSlice.reducer;
