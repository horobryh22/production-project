import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';

import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations/fetchArticleRecommendations';
import { ArticleRecommendationsSchema } from '../types';

const recommendationsAdapter = createEntityAdapter<Article>({
    selectId: article => article?.id,
});

export const articleRecommendationsSelectors =
    recommendationsAdapter.getSelectors<StateSchema>(
        state => state.articleRecommendations || recommendationsAdapter.getInitialState(),
    );

export const articleRecommendationsSlice = createSlice({
    name: 'articleRecommendationsSlice',
    initialState: recommendationsAdapter.getInitialState<ArticleRecommendationsSchema>({
        isLoading: false,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(fetchArticleRecommendations.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchArticleRecommendations.pending, state => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchArticleRecommendations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;
                recommendationsAdapter.setAll(state, action.payload);
            }),
});

export const { reducer: articleRecommendationsReducer } = articleRecommendationsSlice;
