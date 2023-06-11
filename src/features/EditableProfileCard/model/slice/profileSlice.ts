import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { updateUserProfile } from '../services/updateUserProfile/updateUserProfile';
import { ProfileSchema } from '../types';

import { Profile } from '@/entities/Profile';

const initialState: ProfileSchema = {
    data: undefined,
    form: undefined,
    error: undefined,
    isLoading: false,
    readonly: true,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setReadonly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload;
        },
        cancelEdit: state => {
            state.readonly = true;
            state.form = state.data;
            state.validateErrors = undefined;
        },
        changeUserProfile: (state, action: PayloadAction<Profile>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
    },
    extraReducers: builder =>
        builder
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchProfileData.pending, state => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchProfileData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = action.payload;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.validateErrors = action.payload;
                state.isLoading = false;
            })
            .addCase(updateUserProfile.pending, state => {
                state.isLoading = true;
                state.validateErrors = undefined;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = action.payload;
                state.readonly = true;
                state.validateErrors = undefined;
            }),
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
