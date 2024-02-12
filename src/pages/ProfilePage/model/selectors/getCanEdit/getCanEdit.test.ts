import { StateSchema } from '@/app/providers/StoreProvider';

import { getCanEdit } from './getCanEdit';

describe('getCanEdit', () => {
    test('should return true', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                authData: {
                    id: '123',
                },
            },
            profile: {
                form: {
                    id: '123',
                },
            },
        };

        expect(getCanEdit(state as StateSchema)).toBeTruthy();
    });

    test('should return false', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                authData: {
                    id: '123',
                },
            },
            profile: {
                form: {
                    id: '125',
                },
            },
        };

        expect(getCanEdit(state as StateSchema)).toBeFalsy();
    });
});
