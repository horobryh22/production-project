import type { DeepPartial } from 'redux';

import { selectError } from './selectError';

import { StateSchema } from 'app/providers/StoreProvider';

describe('selectError', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            login: {
                error: 'some error',
            },
        };

        expect(selectError(state as StateSchema)).toBe('some error');
    });
});
