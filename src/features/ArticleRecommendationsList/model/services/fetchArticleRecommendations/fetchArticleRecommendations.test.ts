import { fetchArticleRecommendations } from './fetchArticleRecommendations';

import { Article, ArticleType } from 'entities/Article';
import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk';

const articles: Article[] = [
    {
        user: { id: '1', username: 'admin', avatar: 'avatar' },
        type: [ArticleType.IT],
        img: '',
        blocks: [],
        title: 'article',
        createdAt: '2022',
        views: 2000,
        subtitle: '',
        id: '1',
    },
];

describe('fetchArticleRecommendations.test', () => {
    test('success fetching data', async () => {
        const thunk = new TestAsyncThunk(fetchArticleRecommendations);

        thunk.api.get.mockReturnValue(Promise.resolve({ data: articles }));
        const result = await thunk.callThunk();

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(articles);
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    });

    test('error with fetching data', async () => {
        const thunk = new TestAsyncThunk(fetchArticleRecommendations);

        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk();

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    });
});
