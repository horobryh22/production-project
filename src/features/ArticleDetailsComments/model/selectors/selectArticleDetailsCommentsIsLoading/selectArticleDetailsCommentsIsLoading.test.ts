import { selectArticleDetailsCommentsIsLoading } from './selectArticleDetailsCommentsIsLoading';

import { StateSchema } from 'app/providers/StoreProvider';

describe('selectArticleDetailsCommentsIsLoading', () => {
    test('should return isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsComments: {
                isLoading: true,
            },
        };

        expect(selectArticleDetailsCommentsIsLoading(state as StateSchema)).toBeTruthy();
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(
            selectArticleDetailsCommentsIsLoading(state as StateSchema),
        ).toBeUndefined();
    });
});
