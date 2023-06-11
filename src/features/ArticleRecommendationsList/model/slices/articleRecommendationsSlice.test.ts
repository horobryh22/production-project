import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations/fetchArticleRecommendations';
import { ArticleRecommendationsSchema } from '../types';

import { articleRecommendationsReducer } from './articleRecommendationsSlice';

import { Article, ArticleType } from '@/entities/Article';

describe('articleRecommendationsSlice.test', () => {
    let state: ArticleRecommendationsSchema;
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
            id: '2',
        },
        {
            user: { id: '1', username: 'admin', avatar: 'avatar' },
            type: [ArticleType.IT],
            img: '',
            blocks: [],
            title: 'article',
            createdAt: '2022',
            views: 2000,
            subtitle: '',
            id: '3',
        },
        {
            user: { id: '1', username: 'admin', avatar: 'avatar' },
            type: [ArticleType.IT],
            img: '',
            blocks: [],
            title: 'article',
            createdAt: '2022',
            views: 2000,
            subtitle: '',
            id: '4',
        },
    ];

    beforeEach(() => {
        state = {
            isLoading: false,
            ids: ['1'],
            entities: {
                '1': {
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
            },
        };
    });

    test('fetch recommendations pending service', () => {
        const updatedState = articleRecommendationsReducer(
            state,
            fetchArticleRecommendations.pending,
        );

        expect(updatedState.isLoading).toBeTruthy();
        expect(updatedState.error).toBeUndefined();
    });

    test('fetch recommendations rejected service', () => {
        const updatedState = articleRecommendationsReducer(
            state,
            fetchArticleRecommendations.rejected,
        );

        expect(updatedState.isLoading).toBeFalsy();
    });

    test('fetch recommendations fulfilled service', () => {
        const updatedState = articleRecommendationsReducer(
            state,
            fetchArticleRecommendations.fulfilled(articles, '1'),
        );

        expect(updatedState.isLoading).toBeFalsy();
        expect(updatedState.ids).toEqual(['2', '3', '4']);
        expect(Object.keys(updatedState.entities)).toEqual(['2', '3', '4']);
    });
});
