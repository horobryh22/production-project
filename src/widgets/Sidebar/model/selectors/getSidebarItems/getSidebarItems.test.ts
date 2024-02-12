import type { DeepPartial } from 'redux';

import { StateSchema } from '@/app/providers/StoreProvider';

import { getSidebarItems } from './getSidebarItems';

describe('getSidebarItems.test', () => {
    test('if user auth', () => {
        const state: DeepPartial<StateSchema> = {
            user: { authData: { id: '1' } },
        };

        expect(getSidebarItems(state as StateSchema).length).toBe(4);
    });

    test('if user no auth', () => {
        const state: DeepPartial<StateSchema> = {
            user: { authData: undefined },
        };

        expect(getSidebarItems(state as StateSchema).length).toBe(2);
    });
});
