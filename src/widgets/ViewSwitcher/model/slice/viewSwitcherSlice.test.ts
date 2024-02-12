import { ArticleView } from '@/entities/Article';

import { ViewSwitcherSchema } from '../types';

import { viewSwitcherActions, viewSwitcherReducer } from './viewSwitcherSlice';

describe('viewSwitcherSlice.test', () => {
    let state: ViewSwitcherSchema;

    beforeEach(() => {
        state = {
            view: ArticleView.LIST,
            _inited: false,
        };
    });

    test('set view to state', () => {
        const updatedState = viewSwitcherReducer(
            state,
            viewSwitcherActions.setView(ArticleView.TILE),
        );

        expect(updatedState.view).toBe(ArticleView.TILE);
    });

    test('state should be init', () => {
        const updatedState = viewSwitcherReducer(state, viewSwitcherActions.initView());

        expect(updatedState.view).toBe(ArticleView.TILE);
        expect(updatedState._inited).toBeTruthy();
    });
});
