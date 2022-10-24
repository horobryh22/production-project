import { selectIsUserAuth } from './selectIsUserAuth';

import { StateSchema } from 'app/providers/StoreProvider';

describe('selectIsUserAuth', () => {
    test('should return isUserAuth', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                isUserAuth: false,
            },
        };

        expect(selectIsUserAuth(state as StateSchema)).toBeFalsy();
    });
});
