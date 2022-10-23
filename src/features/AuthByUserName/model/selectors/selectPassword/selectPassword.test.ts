import type { DeepPartial } from 'redux';

import { selectPassword } from './selectPassword';

import { StateSchema } from 'app/providers/StoreProvider';

describe('select password', () => {
    test('should return password', () => {
        const state: DeepPartial<StateSchema> = {
            login: {
                password: '123',
            },
        };

        expect(selectPassword(state as StateSchema)).toBe('123');
    });

    test('should work with empty state', () => {
        expect(selectPassword(undefined)).toBe('');
    });
});
