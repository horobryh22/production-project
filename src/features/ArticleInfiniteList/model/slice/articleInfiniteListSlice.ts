import type { PayloadAction } from '@reduxjs/toolkit';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import { ArticleInfiniteListSchema } from '../types';

import { StateSchema } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';

const articleAdapter = createEntityAdapter<Article>({
    selectId: article => article?.id,
});

export const infiniteListSelectors = articleAdapter.getSelectors<StateSchema>(
    state => state.articleInfiniteList || articleAdapter.getInitialState(),
);

export const articleInfiniteListSlice = createSlice({
    name: 'articlePageSlice',
    initialState: articleAdapter.getInitialState<ArticleInfiniteListSchema>({
        isLoading: false,
        page: 1,
        hasMore: true,
        ids: [],
        entities: {},
        limit: 8,
    }),
    reducers: {
        setPageNum: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        selLimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload;
        },
    },
    extraReducers: builder =>
        builder
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchArticlesList.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;

                if (action.meta.arg.replace) {
                    articleAdapter.removeAll(state);
                }
            })
            .addCase(fetchArticlesList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasMore = action.payload.length >= state.limit;

                if (action.meta.arg.replace) {
                    articleAdapter.setAll(state, action.payload);
                } else {
                    articleAdapter.addMany(state, action.payload);
                }
            }),
});

export const { actions: articleInfiniteListActions } = articleInfiniteListSlice;
export const { reducer: articleInfiniteListReducer } = articleInfiniteListSlice;
