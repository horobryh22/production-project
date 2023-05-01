import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { CommentFormSchema } from '../types';

const initialState: CommentFormSchema = {
    isLoading: false,
};

export const commentFormSlice = createSlice({
    name: 'commentFormSlice',
    initialState,
    reducers: {
        changeText: (state, action: PayloadAction<string>) => {
            state.error = undefined;
            state.text = action.payload;
        },
    },
});

export const { actions: commentFormActions } = commentFormSlice;
export const { reducer: commentFormReducer } = commentFormSlice;
