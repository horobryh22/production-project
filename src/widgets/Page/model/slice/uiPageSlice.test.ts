import { UIPageSchema } from '../types';

import { uiPageSliceReducer, uiPageSliceActions } from './uiPageSlice';

describe('uiPageSlice.test', () => {
    let state: UIPageSchema;

    beforeEach(() => {
        state = {
            scroll: {},
        };
    });

    test('set scroll position to state', () => {
        const updatedState = uiPageSliceReducer(
            state,
            uiPageSliceActions.setScrollPosition({ scroll: 500, path: '/articles/' }),
        );

        expect(Object.keys(updatedState.scroll)[0]).toBe('/articles/');
        expect(Object.keys(updatedState.scroll).length).toBe(1);
        expect(updatedState.scroll['/articles/']).toBe(500);
    });
});
