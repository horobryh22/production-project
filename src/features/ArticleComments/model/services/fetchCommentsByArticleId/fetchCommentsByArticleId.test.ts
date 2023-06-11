import { fetchCommentsByArticleId } from './fetchCommentsByArticleId';

import { Comment } from '@/entities/Comment';
import { TestAsyncThunk } from '@/shared/lib/tests/testAsyncThunk';

const comments: Comment[] = [
    {
        user: { id: '1', username: 'admin', avatar: 'avatar' },
        text: 'some text',
        id: '1',
        articleId: '1',
    },
];

describe('fetchCommentsByArticleId.test', () => {
    test('success fetching data', async () => {
        const thunk = new TestAsyncThunk(fetchCommentsByArticleId);

        thunk.api.get.mockReturnValue(Promise.resolve({ data: comments }));
        const result = await thunk.callThunk('1');

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(comments);
    });
    test('error with fetching data', async () => {
        const thunk = new TestAsyncThunk(fetchCommentsByArticleId);

        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk('1');

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
    });
});
