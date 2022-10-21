import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { User, UserSchema } from '../types';

import { USER_LOCAL_STORAGE_KEY } from 'shared/const/localStorage';

const initialState: UserSchema = {
    authData: { id: '', username: '' },
    isUserAuth: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.isUserAuth = true;
            state.authData = action.payload;
        },
        initAuthData: state => {
            const user = JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY));

            if (user) {
                state.authData = user;
                state.isUserAuth = true;
            } else {
                state.authData = { id: '', username: '' };
                state.isUserAuth = false;
            }
        },
        logout: state => {
            state.isUserAuth = false;
            state.authData = { id: '', username: '' };

            localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
        },
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
