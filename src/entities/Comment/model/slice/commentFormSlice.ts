import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { CommentFormSchema } from '../types';

const initialState: CommentFormSchema = {};

export const commentFormSlice = createSlice({
    name: 'commentFormSlice',
    initialState,
    reducers: {
        changeText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
    },
});

export const { actions: commentFormActions } = commentFormSlice;
export const { reducer: commentFormReducer } = commentFormSlice;
