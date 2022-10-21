import type { DeepPartial } from 'redux';

import { selectIsLoading } from './selectIsLoading';

import { StateSchema } from 'app/providers/StoreProvider';

describe('selectIsLoading', () => {
    test('should return isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            login: {
                isLoading: true,
            },
        };

        expect(selectIsLoading(state as StateSchema)).toBeTruthy();
    });
});
