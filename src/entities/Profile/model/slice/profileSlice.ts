import { createSlice } from '@reduxjs/toolkit';

import { fetchProfileData } from '../services/fetchProfileData';
import { ProfileSchema } from '../types';

const initialState: ProfileSchema = {
    data: undefined,
    error: undefined,
    isLoading: false,
    readonly: true,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
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
            }),
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
