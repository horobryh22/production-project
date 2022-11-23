import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { ScrollOptions, UIPageSchema } from '../types';

const initialState: UIPageSchema = {
    scroll: {},
};

export const uiPageSlice = createSlice({
    name: 'uiPageSlice',
    initialState,
    reducers: {
        setScrollPosition: (state, { payload }: PayloadAction<ScrollOptions>) => {
            state.scroll[payload.path] = payload.scroll;
        },
    },
});

export const { actions: uiPageSliceActions } = uiPageSlice;
export const { reducer: uiPageSliceReducer } = uiPageSlice;
