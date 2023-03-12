import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import { ArticlePageSchema } from '../types';

import { articlePageActions, articlePageReducer } from './articlePageSlice';

import { Article, ArticleView } from 'entities/Article';
import { ArticleBlockType, ArticleType } from 'entities/Article/model/types';

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

const articles: Article[] = [
    { ...article, id: '3' },
    { ...article, id: '4' },
    { ...article, id: '5' },
    { ...article, id: '6' },
    { ...article, id: '7' },
    { ...article, id: '8' },
    { ...article, id: '9' },
    { ...article, id: '10' },
    { ...article, id: '11' },
];

describe('articlePageSlice.test', () => {
    let state: ArticlePageSchema;

    beforeEach(() => {
        state = {
            limit: 8,
            hasMore: true,
            ids: ['1', '2'],
            entities: {
                '1': { ...article, id: '1' },
                '2': { ...article, id: '2' },
            },
            isLoading: false,
            view: ArticleView.LIST,
            page: 1,
            _inited: false,
        };
    });

    test('set view to state', () => {
        const updatedState = articlePageReducer(
            state,
            articlePageActions.setView(ArticleView.TILE),
        );

        expect(updatedState.view).toBe(ArticleView.TILE);
    });

    test('set page to state', () => {
        const updatedState = articlePageReducer(state, articlePageActions.setPageNum(3));

        expect(updatedState.page).toBe(3);
    });

    test('state should be init', () => {
        const updatedState = articlePageReducer(state, articlePageActions.initState());

        expect(updatedState.limit).toBe(8);
        expect(updatedState.view).toBe(ArticleView.TILE);
        expect(updatedState._inited).toBeTruthy();
    });

    test('fetching articles pending service', () => {
        const updatedState = articlePageReducer(
            state,
            fetchArticlesList.pending('', { page: 1, replace: false }),
        );

        expect(updatedState.isLoading).toBeTruthy();
        expect(updatedState.error).toBeUndefined();
    });

    test('fetching articles fullfield service hasMore should be true', () => {
        const updatedState = articlePageReducer(
            state,
            fetchArticlesList.fulfilled(articles, '1', { page: 1 }),
        );

        expect(updatedState.isLoading).toBeFalsy();
        expect(updatedState.ids.length).toBe(11);
        expect(Object.keys(updatedState.entities).length).toBe(11);
        expect(updatedState.hasMore).toBeTruthy();
    });

    test('fetching articles fullfield service hasMore should be false', () => {
        const updatedState = articlePageReducer(
            state,
            fetchArticlesList.fulfilled(
                [
                    { ...article, id: '3' },
                    { ...article, id: '4' },
                ],
                '1',
                { page: 1 },
            ),
        );

        expect(updatedState.isLoading).toBeFalsy();
        expect(updatedState.ids.length).toBe(4);
        expect(Object.keys(updatedState.entities).length).toBe(4);
        expect(updatedState.hasMore).toBeFalsy();
    });

    test('all articles were got', () => {
        const updatedState = articlePageReducer(
            state,
            fetchArticlesList.fulfilled([], '1', { page: 1 }),
        );

        expect(updatedState.isLoading).toBeFalsy();
        expect(updatedState.ids.length).toBe(2);
        expect(Object.keys(updatedState.entities).length).toBe(2);
        expect(updatedState.hasMore).toBeFalsy();
    });
});
