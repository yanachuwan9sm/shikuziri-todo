import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";

export interface UserState {
    user: {
        id: number | null;
        twitter_id: string | null;
        name: string | null;
        avatar: string | undefined;
    };
}

const initialState: UserState = {
    user: {
        id: null,
        twitter_id: null,
        name: null,
        avatar: undefined,
    },
};

export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserState["user"]>) => {
            state.user = {
                id: action.payload.id,
                twitter_id: action.payload.twitter_id,
                name: action.payload.name,
                avatar: action.payload.avatar,
            };
        },
        logout: (state) => {
            state.user = {
                id: null,
                twitter_id: null,
                name: null,
                avatar: undefined,
            };
        },
    },
});

export const { login, logout } = UserSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default UserSlice.reducer;
