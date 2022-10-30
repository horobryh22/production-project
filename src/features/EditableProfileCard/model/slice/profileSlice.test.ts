import { updateUserProfile } from '../services/updateUserProfile/updateUserProfile';
import { ProfileSchema, ValidateProfileError } from '../types';

import { profileActions, profileReducer } from './profileSlice';

import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

const userData = {
    age: 28,
    country: Country.RUSSIA,
    lastname: 'Хоробрых',
    username: 'admin',
    currency: Currency.RUB,
    avatar: '',
    city: 'Omsk',
    first: 'Илья',
};

describe('profileSlice.test', () => {
    let state: ProfileSchema;

    beforeEach(() => {
        state = {
            data: userData,
            isLoading: false,
            readonly: true,
            validateErrors: [ValidateProfileError.SERVER_ERROR],
        };
    });

    test('set property readonly to state', () => {
        const updatedState = profileReducer(state, profileActions.setReadonly(false));

        expect(updatedState.readonly).toBeFalsy();
    });

    test('user profile should be changed', () => {
        const updatedState = profileReducer(
            state,
            profileActions.changeUserProfile(userData),
        );

        expect(updatedState.form).toEqual(userData);
    });

    test('values in form should be reset', () => {
        const updatedState = profileReducer(state, profileActions.cancelEdit());

        expect(updatedState.form).toEqual(userData);
        expect(updatedState.readonly).toBe(true);
        expect(updatedState.validateErrors).toBeUndefined();
    });

    test('update profile pending service', () => {
        const updatedState = profileReducer(state, updateUserProfile.pending);

        expect(updatedState.isLoading).toBeTruthy();
        expect(updatedState.validateErrors).toBeUndefined();
    });

    test('update profile fullfield service', () => {
        const updatedState = profileReducer(
            state,
            updateUserProfile.fulfilled(userData, ''),
        );

        expect(updatedState.isLoading).toBeFalsy();
        expect(updatedState.readonly).toBeTruthy();
        expect(updatedState.form).toEqual(updatedState.data);
    });
});
