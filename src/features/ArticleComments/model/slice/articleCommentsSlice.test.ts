import { addCommentForArticle } from '../services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { articleCommentsReducer } from '../slice/articleCommentsSlice';
import { ArticleCommentsSchema } from '../types';

import { Comment } from 'entities/Comment';

describe('articleCommentsSlice.test', () => {
    let state: ArticleCommentsSchema;
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
            ids: ['1'],
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
        const updatedState = articleCommentsReducer(
            state,
            fetchCommentsByArticleId.pending,
        );

        expect(updatedState.isLoading).toBeTruthy();
        expect(updatedState.error).toBeUndefined();
    });

    test('fetch comments rejected service', () => {
        const updatedState = articleCommentsReducer(
            state,
            fetchCommentsByArticleId.rejected,
        );

        expect(updatedState.isLoading).toBeFalsy();
    });

    test('fetch comments fulfilled service', () => {
        const updatedState = articleCommentsReducer(
            state,
            fetchCommentsByArticleId.fulfilled(comments, '1', '1'),
        );

        expect(updatedState.isLoading).toBeFalsy();
        expect(updatedState.ids).toEqual(['1', '5', '3']);
        expect(Object.keys(updatedState.entities)).toEqual(['1', '3', '5']);
    });

    test('add comment pending service', () => {
        const updatedState = articleCommentsReducer(state, addCommentForArticle.pending);

        expect(updatedState.isLoading).toBeTruthy();
        expect(updatedState.error).toBeUndefined();
    });

    test('add comment rejected service', () => {
        const updatedState = articleCommentsReducer(state, addCommentForArticle.rejected);

        expect(updatedState.isLoading).toBeFalsy();
    });

    test('add comment fulfilled service', () => {
        const updatedState = articleCommentsReducer(
            state,
            addCommentForArticle.fulfilled(comments[1], '1', '1'),
        );

        expect(updatedState.isLoading).toBeFalsy();
        expect(Object.keys(updatedState.entities)).toEqual(['1', '5']);
    });
});
