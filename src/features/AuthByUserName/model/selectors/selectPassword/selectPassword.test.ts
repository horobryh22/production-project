import { StateSchema } from '@/app/providers/StoreProvider';

import { selectPassword } from './selectPassword';

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
        expect(selectPassword(undefined!)).toBe('');
    });
});
