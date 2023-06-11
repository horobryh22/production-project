import type { DeepPartial } from 'redux';

import { selectScrollPositionByPath, selectUIPageScroll } from './uiPageSelectors';

import { StateSchema } from '@/app/providers/StoreProvider';

describe('uiPageSelectors.test', () => {
    let state: DeepPartial<StateSchema>;
    const scroll = {
        '/articles/': 500,
        '/articles/5': 800,
    };

    beforeEach(() => {
        state = {
            uiPage: {
                scroll,
            },
        };
    });

    test('selectUIPageScroll', () => {
        const result = selectUIPageScroll(state as StateSchema);

        expect(Object.keys(result).length).toBe(2);
        expect(result).toEqual(scroll);
    });

    test('selectScrollPositionByPath', () => {
        const result = selectScrollPositionByPath(state as StateSchema, '/articles/');

        expect(result).toBe(500);
    });
});
