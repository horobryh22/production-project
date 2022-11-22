import { fetchArticlesList } from './fetchArticlesList';

import { Article } from 'entities/Article';
import { ArticleBlockType, ArticleType } from 'entities/Article/model/types';
import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk';

const article: Article = {
    id: '7',
    user: {
        id: '1',
        avatar: '',
        username: '',
    },
    title: 'Python news',
    subtitle: 'Что нового в JS за 2022 год?',
    img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
    views: 1022,
    createdAt: '26.02.2022',
    type: [ArticleType.IT],
    blocks: [
        {
            id: '1',
            type: ArticleBlockType.TEXT,
            title: 'Заголовок этого блока',
            paragraphs: [
                'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
                'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
            ],
        },
    ],
};

const articles: Article[] = [article, article, article, article];

describe('fetchArticlesList.test', () => {
    test('success fetching articles', async () => {
        const thunk = new TestAsyncThunk(fetchArticlesList, {
            articlePage: {
                page: 1,
                limit: 8,
                hasMore: true,
            },
        });

        thunk.api.get.mockReturnValue(Promise.resolve({ data: articles }));
        const result = await thunk.callThunk({ page: 1 });

        expect(thunk.api.get).toHaveBeenCalled();
        expect(thunk.dispatch).toBeCalledTimes(2);
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(articles);
    });

    test('error with fetching articles', async () => {
        const thunk = new TestAsyncThunk(fetchArticlesList, {
            articlePage: {
                page: 1,
                limit: 8,
                hasMore: true,
            },
        });

        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk({ page: 1 });

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
    });
});
