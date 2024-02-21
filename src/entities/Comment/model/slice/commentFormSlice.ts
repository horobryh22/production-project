import type { PayloadAction } from '@reduxjs/toolkit';

import { buildSlice } from '@/shared/store/buildSlice';

import { CommentFormSchema } from '../types';

const initialState: CommentFormSchema = {};

export const commentFormSlice = buildSlice({
    name: 'commentFormSlice',
    initialState,
    reducers: {
        changeText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
    },
});

export const { useActions: useCommentFormActions } = commentFormSlice;
export const { actions: commentFormActions } = commentFormSlice;
export const { reducer: commentFormReducer } = commentFormSlice;
