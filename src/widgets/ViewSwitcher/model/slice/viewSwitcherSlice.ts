import type { PayloadAction } from '@reduxjs/toolkit';

import { ArticleView } from '@/entities/Article';
import { ARTICLES_VIEW_LOCAL_STORAGE_KEY } from '@/shared/const/localStorage';
import { buildSlice } from '@/shared/store/buildSlice';

import { ViewSwitcherSchema } from '../types';

const initialState: ViewSwitcherSchema = {
    view: ArticleView.TILE,
    _inited: false,
};

export const viewSwitcherSlice = buildSlice({
    name: 'viewSwitcherSlice',
    initialState,
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload;
            localStorage.setItem(ARTICLES_VIEW_LOCAL_STORAGE_KEY, action.payload);
        },
        initView: state => {
            const view =
                (localStorage.getItem(ARTICLES_VIEW_LOCAL_STORAGE_KEY) as ArticleView) ||
                ArticleView.TILE;

            state._inited = true;
            state.view = view;
        },
    },
});

export const { actions: viewSwitcherActions } = viewSwitcherSlice;
export const { useActions: useViewSwitcherActions } = viewSwitcherSlice;
export const { reducer: viewSwitcherReducer } = viewSwitcherSlice;
