import { AddCommentFormSchema } from '../types';

import { addCommentFormActions, addCommentFormReducer } from './addCommentFormSlice';

describe('profileSlice.test', () => {
    let state: AddCommentFormSchema;

    beforeEach(() => {
        state = {
            text: 'Hello world',
            isLoading: false,
        };
    });

    test('text should be changed', () => {
        const updatedState = addCommentFormReducer(
            state,
            addCommentFormActions.changeText('It is a cool article'),
        );

        expect(updatedState.text).toBe('It is a cool article');
    });
});
