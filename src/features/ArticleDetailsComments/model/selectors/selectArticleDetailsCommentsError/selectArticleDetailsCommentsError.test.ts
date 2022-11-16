import { selectArticleDetailsCommentsError } from './selectArticleDetailsCommentsError';

import { StateSchema } from 'app/providers/StoreProvider';

describe('selectArticleDetailsCommentsError', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsComments: {
                error: 'some error',
            },
        };

        expect(selectArticleDetailsCommentsError(state as StateSchema)).toBe(
            'some error',
        );
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(selectArticleDetailsCommentsError(state as StateSchema)).toBeUndefined();
    });
});
