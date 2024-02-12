import { StateSchema } from '@/app/providers/StoreProvider';

import { selectArticleCommentsError } from './selectArticleCommentsError';

describe('selectArticleDetailsCommentsError', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsComments: {
                error: 'some error',
            },
        };

        expect(selectArticleCommentsError(state as StateSchema)).toBe('some error');
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(selectArticleCommentsError(state as StateSchema)).toBeUndefined();
    });
});
