import { TestAsyncThunk } from '@/shared/lib/tests/testAsyncThunk';

import { initView } from './initView';

describe('initArticlesPage.test', () => {
    test('initState action should be called', async () => {
        const thunk = new TestAsyncThunk(initView, {
            viewSwitcher: {
                _inited: false,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(3);
        expect(thunk.getState().viewSwitcher?._inited).toBeFalsy();
    });

    test('initState action should NOT be called', async () => {
        const thunk = new TestAsyncThunk(initView, {
            viewSwitcher: {
                _inited: true,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(2);
        expect(thunk.getState().viewSwitcher?._inited).toBeTruthy();
    });
});
