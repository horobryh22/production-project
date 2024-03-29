import type { PayloadAction } from '@reduxjs/toolkit';

import { ArticleSortType, ArticleType } from '@/entities/Article';
import { buildSlice } from '@/shared/store/buildSlice';
import { SortOrder } from '@/shared/types';

import { ArticlesPageFilterSchema, ArticlesPageURLParams } from '../types';

const initialState: ArticlesPageFilterSchema = {
    order: SortOrder.DESC,
    typeTab: ArticleType.ALL,
    search: '',
    sort: ArticleSortType.CREATED,
    _inited: false,
};

export const articlesPageFilterSlice = buildSlice({
    name: 'articlesPageFilterSlice',
    initialState,
    reducers: {
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setSort: (state, action: PayloadAction<ArticleSortType>) => {
            state.sort = action.payload;
        },
        setTypeTab: (state, action: PayloadAction<ArticleType>) => {
            state.typeTab = action.payload;
        },
        initState: (state, action: PayloadAction<ArticlesPageURLParams>) => {
            state._inited = true;
            state.typeTab = action.payload.typeTab;
            state.search = action.payload.search;
            state.order = action.payload.order;
            state.sort = action.payload.sort;
        },
    },
});

export const { actions: articlesPageFilterActions } = articlesPageFilterSlice;
export const { useActions: useArticlePageFilterActions } = articlesPageFilterSlice;
export const { reducer: articlesPageFilterReducer } = articlesPageFilterSlice;
