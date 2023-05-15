import { ValidateProfileError } from '../../consts/consts';

import { validateProfileData } from './validateProfileData';

import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

const profileData = {
    age: 28,
    country: Country.RUSSIA,
    lastname: 'Хоробрых',
    username: 'admin',
    currency: Currency.RUB,
    avatar: '',
    city: 'Omsk',
    first: 'Илья',
};

describe('validateProfileData.test', () => {
    test('all values are correct', async () => {
        const result = validateProfileData(profileData);

        expect(result).toEqual([]);
    });

    test('without first and last name', async () => {
        const result = validateProfileData({ ...profileData, first: '', lastname: '' });

        expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
    });

    test('without age', async () => {
        const result = validateProfileData({ ...profileData, age: undefined });

        expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
    });

    test('without country', async () => {
        const result = validateProfileData({ ...profileData, country: undefined });

        expect(result).toEqual([ValidateProfileError.INCORRECT_COUNTRY]);
    });

    test('incorrect all values', async () => {
        const result = validateProfileData({
            ...profileData,
            country: undefined,
            age: undefined,
            first: '',
        });

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_AGE,
            ValidateProfileError.INCORRECT_COUNTRY,
        ]);
    });
});
