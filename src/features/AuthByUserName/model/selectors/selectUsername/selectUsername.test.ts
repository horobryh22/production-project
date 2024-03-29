import { StateSchema } from '@/app/providers/StoreProvider';

import { selectUsername } from './selectUsername';

describe('select username', () => {
    test('should return username', () => {
        const state: DeepPartial<StateSchema> = {
            login: {
                username: 'admin',
            },
        };

        expect(selectUsername(state as StateSchema)).toBe('admin');
    });

    test('should work with empty state', () => {
        expect(selectUsername(undefined!)).toBe('');
    });
});
