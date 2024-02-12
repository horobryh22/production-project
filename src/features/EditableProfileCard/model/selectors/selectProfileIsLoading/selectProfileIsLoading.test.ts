import { StateSchema } from '@/app/providers/StoreProvider';

import { selectProfileIsLoading } from './selectProfileIsLoading';

describe('selectProfileIsLoading', () => {
    test('should return is Loading', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                isLoading: true,
            },
        };

        expect(selectProfileIsLoading(state as StateSchema)).toBeTruthy();
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(selectProfileIsLoading(state as StateSchema)).toBeUndefined();
    });
});
