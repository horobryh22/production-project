import { initArticlesPage } from './initArticlesPage';

import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk';

describe('initArticlesPage.test', () => {
    test('initState action should be called', async () => {
        const thunk = new TestAsyncThunk(initArticlesPage, {
            articlePage: {
                _inited: false,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(3);
        expect(thunk.getState().articlePage?._inited).toBeFalsy();
    });

    test('initState action should NOT be called', async () => {
        const thunk = new TestAsyncThunk(initArticlesPage, {
            articlePage: {
                _inited: true,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(2);
        expect(thunk.getState().articlePage?._inited).toBeTruthy();
    });
});
