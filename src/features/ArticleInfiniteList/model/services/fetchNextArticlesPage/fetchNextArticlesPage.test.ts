import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

import { fetchNextArticlesPage } from './fetchNextArticlesPage';

import { TestAsyncThunk } from '@/shared/lib/tests/testAsyncThunk';

jest.mock('../fetchArticlesList/fetchArticlesList');

describe('fetchNextArticlesPage.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articleInfiniteList: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                hasMore: true,
                isLoading: false,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(4);
        expect(fetchArticlesList).toBeCalledWith({ page: 3 });
    });

    test('fetchArticlesList not called  because of hasMore', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articleInfiniteList: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                hasMore: false,
                isLoading: false,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(2);
        expect(fetchArticlesList).not.toHaveBeenCalled();
    });

    test('fetchArticlesList not called because of isLoading', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articleInfiniteList: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                hasMore: false,
                isLoading: true,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(2);
        expect(fetchArticlesList).not.toHaveBeenCalled();
    });
});
