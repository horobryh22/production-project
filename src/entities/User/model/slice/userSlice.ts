import type { PayloadAction } from '@reduxjs/toolkit';

import { USER_LOCAL_STORAGE_KEY } from '@/shared/const/localStorage';
import { features } from '@/shared/lib/features';
import { buildSlice } from '@/shared/store/buildSlice';

import { initAuthData } from '../services/initAuthData/initAuthData';
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
        logout: state => {
            state.isUserAuth = false;
            state.authData = { id: '', username: '' };

            localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
        },
    },
    extraReducers: builder =>
        builder
            .addCase(
                saveJsonSettings.fulfilled,
                (state, action: PayloadAction<JsonSettings>) => {
                    if (state.authData) {
                        state.authData.jsonSettings = action.payload;
                    }
                },
            )
            .addCase(initAuthData.fulfilled, (state, action: PayloadAction<User>) => {
                state.authData = action.payload;
                state.isUserAuth = true;
                state._initialized = true;

                features.setFeatureFlags(action.payload.featureFlags);
            })
            .addCase(initAuthData.rejected, state => {
                state._initialized = true;
            }),
});

export const { useActions: useUserActions } = userSlice;
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
