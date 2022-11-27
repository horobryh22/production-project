import { ArticlesPageFilterSchema } from '../types';

import {
    articlesPageFilterActions,
    articlesPageFilterReducer,
} from './articlesPageFilterSlice';

import { ArticleSortType, ArticleType } from 'entities/Article';
import { SortOrder } from 'shared/types';

describe('articlesPageFilterSlice.test', () => {
    let state: ArticlesPageFilterSchema;

    beforeEach(() => {
        state = {
            order: SortOrder.ASC,
            typeTab: ArticleType.ALL,
            search: 'search',
            sort: ArticleSortType.CREATED,
            _inited: false,
        };
    });

    test('property order should be set', () => {
        const updatedState = articlesPageFilterReducer(
            state,
            articlesPageFilterActions.setOrder(SortOrder.DESC),
        );

        expect(updatedState.order).toBe(SortOrder.DESC);
    });

    test('property typeTab should be set', () => {
        const updatedState = articlesPageFilterReducer(
            state,
            articlesPageFilterActions.setTypeTab(ArticleType.ECONOMICS),
        );

        expect(updatedState.typeTab).toBe(ArticleType.ECONOMICS);
    });

    test('property search should be set', () => {
        const updatedState = articlesPageFilterReducer(
            state,
            articlesPageFilterActions.setSearch(''),
        );

        expect(updatedState.search).toBe('');
    });

    test('property sort should be set', () => {
        const updatedState = articlesPageFilterReducer(
            state,
            articlesPageFilterActions.setSort(ArticleSortType.TITLE),
        );

        expect(updatedState.sort).toBe(ArticleSortType.TITLE);
    });

    test('data should be set in state', () => {
        const updatedState = articlesPageFilterReducer(
            state,
            articlesPageFilterActions.initState({
                order: SortOrder.DESC,
                typeTab: ArticleType.IT,
                search: '',
                sort: ArticleSortType.VIEWS,
            }),
        );

        expect(updatedState._inited).toBeTruthy();
        expect(updatedState.sort).toBe(ArticleSortType.VIEWS);
        expect(updatedState.typeTab).toBe(ArticleType.IT);
        expect(updatedState.order).toBe(SortOrder.DESC);
        expect(updatedState.search).toBe('');
    });
});
