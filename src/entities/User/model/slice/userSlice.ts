import type { PayloadAction } from '@reduxjs/toolkit';

import { USER_LOCAL_STORAGE_KEY } from '@/shared/const/localStorage';
import { buildSlice } from '@/shared/store/buildSlice';

import { User, UserSchema } from '../types';

const initialState: UserSchema = {
    authData: { id: '', username: '' },
    isUserAuth: false,
    _initialized: false,
};

export const userSlice = buildSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.isUserAuth = true;
            state.authData = action.payload;
        },
        initAuthData: state => {
            const user = JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY)!);

            if (user) {
                state.authData = user;
                state.isUserAuth = true;
            } else {
                state.authData = { id: '', username: '' };
                state.isUserAuth = false;
            }

            state._initialized = true;
        },
        logout: state => {
            state.isUserAuth = false;
            state.authData = { id: '', username: '' };

            localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
        },
    },
});

export const { useActions: useUserActions } = userSlice;
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
