import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { loginByUsername } from '../services/loginByUsername/loginByUsername';
import { LoginSchema } from '../types';

const initialState: LoginSchema = {
    isLoading: false,
    username: '',
    password: '',
    error: null,
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
    extraReducers: builder =>
        builder
            .addCase(loginByUsername.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(loginByUsername.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginByUsername.fulfilled, state => {
                state.isLoading = false;
            }),
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
