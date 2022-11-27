import { initArticlesPageFilter } from './initArticlesPageFilter';

import { ArticleSortType, ArticleType } from 'entities/Article';
import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk';
import { SortOrder } from 'shared/types';

describe('initArticlesPageFilter.test', () => {
    test('state should be inited', async () => {
        const thunk = new TestAsyncThunk(initArticlesPageFilter, {
            articlesPageFilter: {
                order: SortOrder.DESC,
                typeTab: ArticleType.IT,
                search: 'search',
                sort: ArticleSortType.TITLE,
                _inited: false,
            },
        });

        const result = await thunk.callThunk({
            get(name: string): string | null {
                return name;
            },
        } as URLSearchParams);

        expect(thunk.dispatch).toBeCalledTimes(3);
        expect(result.meta.requestStatus).toBe('fulfilled');
    });

    test('dispatch with initState action should not be called', async () => {
        const thunk = new TestAsyncThunk(initArticlesPageFilter, {
            articlesPageFilter: {
                order: SortOrder.DESC,
                typeTab: ArticleType.IT,
                search: 'search',
                sort: ArticleSortType.TITLE,
                _inited: true,
            },
        });

        const result = await thunk.callThunk({
            get(name: string): string | null {
                return name;
            },
        } as URLSearchParams);

        expect(thunk.dispatch).toBeCalledTimes(2);
        expect(result.meta.requestStatus).toBe('fulfilled');
    });
});
