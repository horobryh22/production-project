import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

import { initArticlesPage } from './initArticlesPage';

import { ArticleView } from 'entities/Article';
import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk';

jest.mock('../fetchArticlesList/fetchArticlesList');

describe('initArticlesPage.test', () => {
    test('fetchArticlesList should be called', async () => {
        const thunk = new TestAsyncThunk(initArticlesPage, {
            articlePage: {
                page: 4,
                ids: [],
                entities: {},
                limit: 5,
                view: ArticleView.TILE,
                hasMore: true,
                isLoading: false,
                _inited: false,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(4);
        expect(fetchArticlesList).toBeCalledWith({ page: 4 });
    });

    test('fetchArticlesList not called because of inited', async () => {
        const thunk = new TestAsyncThunk(initArticlesPage, {
            articlePage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                view: ArticleView.TILE,
                hasMore: false,
                isLoading: false,
                _inited: true,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(2);
        expect(fetchArticlesList).not.toHaveBeenCalled();
        expect(thunk.getState().articlePage?._inited).toBeTruthy();
    });
});
