import { StateSchema } from '@/app/providers/StoreProvider';

import { selectProfileReadonly } from './selectProfileReadonly';

describe('selectProfileReadonly', () => {
    test('should return readonly', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                readonly: false,
            },
        };

        expect(selectProfileReadonly(state as StateSchema)).toBeFalsy();
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(selectProfileReadonly(state as StateSchema)).toBeUndefined();
    });
});
