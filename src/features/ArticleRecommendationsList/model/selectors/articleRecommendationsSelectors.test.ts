import {
    selectArticleRecommendationsError,
    selectArticleRecommendationsIsLoading,
} from './articleRecommendationsSelectors';

import { StateSchema } from '@/app/providers/StoreProvider';

describe('articleRecommendationsSelectors', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            articleRecommendations: {
                error: 'error',
            },
        };

        expect(selectArticleRecommendationsError(state as StateSchema)).toBe('error');
    });

    test('selectArticleRecommendationsError should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(selectArticleRecommendationsError(state as StateSchema)).toBeUndefined();
    });

    test('should return isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            articleRecommendations: {
                isLoading: true,
            },
        };

        expect(selectArticleRecommendationsIsLoading(state as StateSchema)).toBeTruthy();
    });

    test('selectArticleRecommendationsIsLoading should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(
            selectArticleRecommendationsIsLoading(state as StateSchema),
        ).toBeUndefined();
    });
});
