import type { DeepPartial } from 'redux';

import { selectCounterValue } from '../selectCounterValue/selectCounterValue';

import { StateSchema } from 'app/providers/StoreProvider';

describe('selectCounterValue.test', () => {
    test('selector should return correct value', () => {
        const state: DeepPartial<StateSchema> = {
            counter: { value: 10 },
        };

        expect(selectCounterValue(state as StateSchema)).toBe(10);
    });
});
