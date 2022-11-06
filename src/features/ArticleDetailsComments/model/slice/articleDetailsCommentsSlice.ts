import { createSlice } from '@reduxjs/toolkit';

import { ArticleDetailsCommentsSchema } from '../types';

const initialState: ArticleDetailsCommentsSchema = {
    data: undefined,
    error: undefined,
    isLoading: false,
};

export const articleDetailsCommentsSlice = createSlice({
    name: 'articleDetailsComments',
    initialState,
    reducers: {},
});

export const { actions: articleDetailsCommentsActions } = articleDetailsCommentsSlice;
export const { reducer: articleDetailsCommentsReducer } = articleDetailsCommentsSlice;
