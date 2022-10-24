import { createSlice } from '@reduxjs/toolkit';

import { ProfileSchema } from '../types';

const initialState: ProfileSchema = {
    data: undefined,
    error: null,
    isLoading: false,
    readonly: true,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
