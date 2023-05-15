import { ValidateProfileError } from '../../consts/consts';

import { selectProfileValidateErrors } from './selectProfileValidateErrors';

import { StateSchema } from 'app/providers/StoreProvider';

describe('selectProfileValidateErrors', () => {
    test('should return array with errors', () => {
        const errors: ValidateProfileError[] = [
            ValidateProfileError.SERVER_ERROR,
            ValidateProfileError.INCORRECT_AGE,
        ];

        const state: DeepPartial<StateSchema> = {
            profile: {
                validateErrors: errors,
            },
        };

        expect(selectProfileValidateErrors(state as StateSchema)).toEqual(errors);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(selectProfileValidateErrors(state as StateSchema)).toBeUndefined();
    });
});
