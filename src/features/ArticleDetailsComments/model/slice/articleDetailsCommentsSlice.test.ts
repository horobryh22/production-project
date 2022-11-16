import { addCommentForArticle } from '../services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { ArticleDetailsCommentsSchema } from '../types';

import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice';

import { Comment } from 'entities/Comment';

describe('articleDetailsCommentsSlice.test', () => {
    let state: ArticleDetailsCommentsSchema;
    const comments: Comment[] = [
        {
            user: { id: '1', username: 'admin', avatar: 'avatar' },
            text: 'some text',
            id: '1',
            articleId: '1',
        },
        {
            user: { id: '5', username: 'admin', avatar: 'avatar' },
            text: 'some text',
            id: '5',
            articleId: '5',
        },
        {
            user: { id: '1', username: 'admin', avatar: 'avatar' },
            text: 'some text again',
            id: '3',
            articleId: '1',
        },
    ];

    beforeEach(() => {
        state = {
            isLoading: false,
            ids: [],
            entities: {
                '1': {
                    user: { id: '1', username: 'admin', avatar: 'avatar' },
                    text: 'some text',
                    id: '1',
                    articleId: '1',
                },
            },
        };
    });

    test('fetch comments pending service', () => {
        const updatedState = articleDetailsCommentsReducer(
            state,
            fetchCommentsByArticleId.pending,
        );

        expect(updatedState.isLoading).toBeTruthy();
        expect(updatedState.error).toBeUndefined();
    });

    test('fetch comments rejected service', () => {
        const updatedState = articleDetailsCommentsReducer(
            state,
            fetchCommentsByArticleId.rejected,
        );

        expect(updatedState.isLoading).toBeFalsy();
    });

    test('fetch comments fulfilled service', () => {
        const updatedState = articleDetailsCommentsReducer(
            state,
            fetchCommentsByArticleId.fulfilled(comments, '1', '1'),
        );

        expect(updatedState.isLoading).toBeFalsy();
        expect(updatedState.ids).toEqual(['1', '5', '3']);
        expect(Object.keys(updatedState.entities)).toEqual(['1', '3', '5']);
    });

    test('add comment pending service', () => {
        const updatedState = articleDetailsCommentsReducer(
            state,
            addCommentForArticle.pending,
        );

        expect(updatedState.isLoading).toBeTruthy();
        expect(updatedState.error).toBeUndefined();
    });

    test('add comment rejected service', () => {
        const updatedState = articleDetailsCommentsReducer(
            state,
            addCommentForArticle.rejected,
        );

        expect(updatedState.isLoading).toBeFalsy();
    });

    test('add comment fulfilled service', () => {
        const updatedState = articleDetailsCommentsReducer(
            state,
            addCommentForArticle.fulfilled(comments[1], '1', '1'),
        );

        expect(updatedState.isLoading).toBeFalsy();
        expect(Object.keys(updatedState.entities)).toEqual(['1', '5']);
    });
});
