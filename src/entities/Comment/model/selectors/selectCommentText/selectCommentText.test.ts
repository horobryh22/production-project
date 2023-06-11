import { selectCommentText } from './selectCommentText';

import { StateSchema } from '@/app/providers/StoreProvider';

describe('selectCommentText', () => {
    test('should return text', () => {
        const state: DeepPartial<StateSchema> = {
            commentForm: {
                text: 'Hello world',
            },
        };

        expect(selectCommentText(state as StateSchema)).toBe('Hello world');
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(selectCommentText(state as StateSchema)).toBeUndefined();
    });
});
