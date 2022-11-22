import type { PayloadAction } from '@reduxjs/toolkit';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import { ArticlePageSchema } from '../types';

import { StateSchema } from 'app/providers/StoreProvider';
import { Article, ArticleView } from 'entities/Article';
import { ARTICLES_VIEW_LOCAL_STORAGE_KEY } from 'shared/const/localStorage';

const articleAdapter = createEntityAdapter<Article>({
    selectId: article => article?.id,
});

export const articleSelectors = articleAdapter.getSelectors<StateSchema>(
    state => state.articlePage || articleAdapter.getInitialState(),
);

export const articlePageSlice = createSlice({
    name: 'articlePageSlice',
    initialState: articleAdapter.getInitialState<ArticlePageSchema>({
        isLoading: false,
        view: ArticleView.TILE,
        page: 1,
        hasMore: true,
        ids: [],
        entities: {},
    }),
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload;
            localStorage.setItem(ARTICLES_VIEW_LOCAL_STORAGE_KEY, action.payload);
        },
        setPageNum: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        initState: state => {
            const view = localStorage.getItem(
                ARTICLES_VIEW_LOCAL_STORAGE_KEY,
            ) as ArticleView;

            state.view = view;
            state.limit = view === ArticleView.TILE ? 9 : 3;
        },
    },
    extraReducers: builder =>
        builder
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchArticlesList.pending, state => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(
                fetchArticlesList.fulfilled,
                (state, action: PayloadAction<Article[]>) => {
                    state.isLoading = false;
                    articleAdapter.addMany(state, action.payload);
                    state.hasMore = action.payload.length > 0;
                },
            ),
});

export const { actions: articlePageActions } = articlePageSlice;
export const { reducer: articlePageReducer } = articlePageSlice;
