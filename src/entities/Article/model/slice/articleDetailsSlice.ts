import type { PayloadAction } from '@reduxjs/toolkit';

import { buildSlice } from '@/shared/store/buildSlice';

import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { Article, ArticleDetailsSchema } from '../types';

const initialState: ArticleDetailsSchema = {
    data: undefined,
    error: undefined,
    isLoading: false,
};

export const articleDetailsSlice = buildSlice({
    name: 'articleDetails',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(fetchArticleById.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchArticleById.pending, state => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(
                fetchArticleById.fulfilled,
                (state, action: PayloadAction<Article>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                    state.error = undefined;
                },
            ),
});

export const { reducer: articleDetailsReducer } = articleDetailsSlice;
