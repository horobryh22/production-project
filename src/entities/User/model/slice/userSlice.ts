import type { PayloadAction } from '@reduxjs/toolkit';

import { USER_LOCAL_STORAGE_KEY } from '@/shared/const/localStorage';
import { features } from '@/shared/lib/features';
import { buildSlice } from '@/shared/store/buildSlice';

import { saveJsonSettings } from '../services/saveJsonSettings/saveJsonSettings';
import { JsonSettings, User, UserSchema } from '../types';

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

            features.setFeatureFlags(action.payload.featureFlags);
        },
        initAuthData: state => {
            const user = JSON.parse(
                localStorage.getItem(USER_LOCAL_STORAGE_KEY)!,
            ) as User;

            if (user) {
                state.authData = user;
                state.isUserAuth = true;

                features.setFeatureFlags(user.featureFlags);
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
    extraReducers: builder =>
        builder.addCase(
            saveJsonSettings.fulfilled,
            (state, action: PayloadAction<JsonSettings>) => {
                if (state.authData) {
                    state.authData.jsonSettings = action.payload;
                }
            },
        ),
});

export const { useActions: useUserActions } = userSlice;
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
