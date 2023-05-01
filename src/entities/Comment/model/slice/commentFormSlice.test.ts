import { commentFormActions, commentFormReducer } from '../slice/commentFormSlice';
import { CommentFormSchema } from '../types';

describe('profileSlice.test', () => {
    let state: CommentFormSchema;

    beforeEach(() => {
        state = {
            text: 'Hello world',
        };
    });

    test('text should be changed', () => {
        const updatedState = commentFormReducer(
            state,
            commentFormActions.changeText('It is a cool article'),
        );

        expect(updatedState.text).toBe('It is a cool article');
    });
});
