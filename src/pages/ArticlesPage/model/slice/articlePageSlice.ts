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
        _inited: false,
        limit: 9,
    }),
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload;
            localStorage.setItem(ARTICLES_VIEW_LOCAL_STORAGE_KEY, action.payload);
            state.limit = action.payload === ArticleView.TILE ? 9 : 3;
        },
        setPageNum: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        initState: state => {
            const view =
                (localStorage.getItem(ARTICLES_VIEW_LOCAL_STORAGE_KEY) as ArticleView) ||
                ArticleView.TILE;

            state._inited = true;
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

export const { actions: articlePageActions } = articlePageSlice;
export const { reducer: articlePageReducer } = articlePageSlice;
