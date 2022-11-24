import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { ArticlesPageFilterSchema } from '../types';

import { ArticleSortType } from 'entities/Article';
import { SortOrder } from 'shared/types';

const initialState: ArticlesPageFilterSchema = {
    order: SortOrder.DESC,
    search: '',
    sort: ArticleSortType.CREATED,
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
    },
});

export const { actions: articlesPageFilterActions } = articlesPageFilterSlice;
export const { reducer: articlesPageFilterReducer } = articlesPageFilterSlice;
