import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { sendComment } from '../services/sendComment/sendComment';
import { AddCommentFormSchema } from '../types';

const initialState: AddCommentFormSchema = {
    isLoading: false,
};

export const addCommentFormSlice = createSlice({
    name: 'addCommentFormSlice',
    initialState,
    reducers: {
        changeText: (state, action: PayloadAction<string>) => {
            state.error = undefined;
            state.text = action.payload;
        },
    },
    extraReducers: builder =>
        builder
            .addCase(sendComment.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(sendComment.pending, state => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(sendComment.fulfilled, state => {
                state.isLoading = false;
            }),
});

export const { actions: addCommentFormActions } = addCommentFormSlice;
export const { reducer: addCommentFormReducer } = addCommentFormSlice;
