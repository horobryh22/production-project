import type { DeepPartial } from 'redux';

import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticleSortType, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types';

import {
    selectArticlesPageFilterOrder,
    selectArticlesPageFilterSort,
    selectArticlesPageFilterTypeTab,
    selectArticlesPageFilterSearch,
    selectArticlesPageFilterInited,
} from './articlesPageFilterSelectors';

describe('articlesPageFilterSelectors.test', () => {
    let state: DeepPartial<StateSchema>;

    beforeEach(() => {
        state = {
            articlesPageFilter: {
                sort: ArticleSortType.CREATED,
                _inited: false,
                search: 'test',
                order: SortOrder.DESC,
                typeTab: ArticleType.ALL,
            },
        };
    });

    test('selectArticlesPageFilterOrder', () => {
        const order = selectArticlesPageFilterOrder(state as StateSchema);

        expect(order).toBe(SortOrder.DESC);
    });

    test('selectArticlesPageFilterSort', () => {
        const sort = selectArticlesPageFilterSort(state as StateSchema);

        expect(sort).toBe(ArticleSortType.CREATED);
    });

    test('selectArticlesPageFilterTypeTab', () => {
        const type = selectArticlesPageFilterTypeTab(state as StateSchema);

        expect(type).toBe(ArticleType.ALL);
    });

    test('selectArticlesPageFilterSearch', () => {
        const search = selectArticlesPageFilterSearch(state as StateSchema);

        expect(search).toBe('test');
    });

    test('selectArticlesPageFilterInited', () => {
        const inited = selectArticlesPageFilterInited(state as StateSchema);

        expect(inited).toBeFalsy();
    });
});
