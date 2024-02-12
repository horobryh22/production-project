import { StateSchema } from '@/app/providers/StoreProvider';

import {
    selectArticleDetailsData,
    selectArticleDetailsIsLoading,
    selectArticleDetailsError,
} from './articleDetails';

describe('articleDetails selectors', () => {
    const state: DeepPartial<StateSchema> = {
        articleDetails: {
            data: { id: '1', title: 'Java Script' },
            isLoading: true,
            error: 'some error',
        },
    };

    test('select data', () => {
        expect(selectArticleDetailsData(state as StateSchema)).toEqual({
            id: '1',
            title: 'Java Script',
        });
    });

    test('select isLoading', () => {
        expect(selectArticleDetailsData(state as StateSchema)).toBeTruthy();
    });

    test('select error', () => {
        expect(selectArticleDetailsError(state as StateSchema)).toBe('some error');
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(selectArticleDetailsData(state as StateSchema)).toBeUndefined();
        expect(selectArticleDetailsIsLoading(state as StateSchema)).toBeUndefined();
        expect(selectArticleDetailsError(state as StateSchema)).toBeUndefined();
    });
});
