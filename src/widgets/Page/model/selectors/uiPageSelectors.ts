import { createSelector } from 'reselect';

import { StateSchema } from '@/app/providers/StoreProvider';

export const selectUIPageScroll = (state: StateSchema): Record<string, number> =>
    state.uiPage.scroll;

export const selectScrollPositionByPath = createSelector(
    selectUIPageScroll,
    (state: StateSchema, path: string) => path,
    (scroll, path) => scroll[path] || 0,
);
