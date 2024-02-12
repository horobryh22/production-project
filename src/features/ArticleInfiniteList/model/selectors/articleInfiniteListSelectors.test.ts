import type { DeepPartial } from 'redux';

import { StateSchema } from '@/app/providers/StoreProvider';

import {
    selectInfiniteListHasMore,
    selectInfiniteListIsLoading,
    selectInfiniteListPageNum,
    selectInfiniteListError,
    selectInfiniteListLimit,
} from './articleInfiniteListSelectors';

describe('articleInfiniteList.test', () => {
    let state: DeepPartial<StateSchema>;

    beforeEach(() => {
        state = {
            articleInfiniteList: {
                page: 3,
                isLoading: true,
                hasMore: false,
                ids: [],
                entities: {},
                limit: 8,
            },
        };
    });

    test('selectInfiniteListIsLoading', () => {
        const isLoading = selectInfiniteListIsLoading(state as StateSchema);

        expect(isLoading).toBeTruthy();
    });

    test('selectInfiniteListHasMore', () => {
        const hasMore = selectInfiniteListHasMore(state as StateSchema);

        expect(hasMore).toBeFalsy();
    });

    test('selectInfiniteListPageNum', () => {
        const page = selectInfiniteListPageNum(state as StateSchema);

        expect(page).toBe(3);
    });

    test('selectInfiniteListError', () => {
        const error = selectInfiniteListError(state as StateSchema);

        expect(error).toBeUndefined();
    });

    test('selectInfiniteListLimit', () => {
        const limit = selectInfiniteListLimit(state as StateSchema);

        expect(limit).toBe(8);
    });
});
