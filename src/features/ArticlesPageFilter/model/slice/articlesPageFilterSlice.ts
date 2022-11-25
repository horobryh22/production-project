import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { ArticlesPageFilterSchema, ArticlesPageURLParams } from '../types';

import { ArticleSortType } from 'entities/Article';
import { ArticleType } from 'entities/Article/model/types';
import { SortOrder } from 'shared/types';

const initialState: ArticlesPageFilterSchema = {
    order: SortOrder.DESC,
    typeTab: ArticleType.ALL,
    search: '',
    sort: ArticleSortType.CREATED,
    _inited: false,
};

export const articlesPageFilterSlice = createSlice({
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
export const { reducer: articlesPageFilterReducer } = articlesPageFilterSlice;
