import { selectCommentIsLoading } from './selectCommentIsLoading';

import { StateSchema } from 'app/providers/StoreProvider';

describe('selectCommentIsLoading', () => {
    test('should return isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            addCommentForm: {
                isLoading: true,
            },
        };

        expect(selectCommentIsLoading(state as StateSchema)).toBeTruthy();
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(selectCommentIsLoading(state as StateSchema)).toBeUndefined();
    });
});
