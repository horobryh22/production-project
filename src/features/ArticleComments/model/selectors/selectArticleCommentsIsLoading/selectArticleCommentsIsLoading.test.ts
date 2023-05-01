import { selectArticleCommentsIsLoading } from './selectArticleCommentsIsLoading';

import { StateSchema } from 'app/providers/StoreProvider';

describe('selectArticleDetailsCommentsIsLoading', () => {
    test('should return isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsComments: {
                isLoading: true,
            },
        };

        expect(selectArticleCommentsIsLoading(state as StateSchema)).toBeTruthy();
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(selectArticleCommentsIsLoading(state as StateSchema)).toBeUndefined();
    });
});
