import { addCommentForArticle } from './addCommentForArticle';

import { Comment } from 'entities/Comment';
import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk';

const comment: Comment = {
    user: {
        id: '123',
        username: 'admin',
        avatar: 'avatar',
    },
    id: 'some id',
    text: 'text',
    articleId: '12345',
};

describe('addCommentForArticle.test', () => {
    test('create success', async () => {
        const thunk = new TestAsyncThunk(addCommentForArticle, {
            user: {
                authData: { id: '123', username: 'admin', avatar: 'avatar' },
            },
            articleDetails: {
                data: {
                    id: '12345',
                },
            },
        });

        thunk.api.post.mockReturnValue(Promise.resolve({ data: comment }));
        const result = await thunk.callThunk('text');

        expect(thunk.api.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(comment);
    });

    test('server error create', async () => {
        const thunk = new TestAsyncThunk(addCommentForArticle, {
            user: {
                authData: { id: '123', username: 'admin', avatar: 'avatar' },
            },
            articleDetails: {
                data: {
                    id: '12345',
                },
            },
        });

        thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk('text');

        expect(thunk.api.post).toHaveBeenCalledTimes(1);
        expect(result.meta.requestStatus).toBe('rejected');
    });
});
