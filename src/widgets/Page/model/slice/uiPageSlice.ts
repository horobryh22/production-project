import type { PayloadAction } from '@reduxjs/toolkit';

import { buildSlice } from '@/shared/store/buildSlice';

import { ScrollOptions, UIPageSchema } from '../types';

const initialState: UIPageSchema = {
    scroll: {},
};

export const uiPageSlice = buildSlice({
    name: 'uiPageSlice',
    initialState,
    reducers: {
        setScrollPosition: (state, { payload }: PayloadAction<ScrollOptions>) => {
            state.scroll[payload.path] = payload.scroll;
        },
    },
});

export const { actions: uiPageSliceActions } = uiPageSlice;
export const { useActions: useUIPageActions } = uiPageSlice;
export const { reducer: uiPageSliceReducer } = uiPageSlice;
