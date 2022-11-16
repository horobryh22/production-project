import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

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
});

export const { actions: addCommentFormActions } = addCommentFormSlice;
export const { reducer: addCommentFormReducer } = addCommentFormSlice;
