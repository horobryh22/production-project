import { ValidateProfileError } from '../../consts/consts';

import { updateUserProfile } from './updateUserProfile';

import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk';

const profileData = {
    age: 28,
    country: Country.RUSSIA,
    lastname: 'Хоробрых',
    username: 'admin',
    currency: Currency.RUB,
    avatar: '',
    city: 'Omsk',
    first: 'Илья',
    id: '1',
};

describe('updateUserProfile.test', () => {
    test('update success', async () => {
        const thunk = new TestAsyncThunk(updateUserProfile, {
            profile: { form: profileData },
        });

        thunk.api.put.mockReturnValue(Promise.resolve({ data: profileData }));
        const result = await thunk.callThunk('1');

        expect(thunk.api.put).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(profileData);
    });

    test('server error update', async () => {
        const thunk = new TestAsyncThunk(updateUserProfile, {
            profile: { form: profileData },
        });

        thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk('1');

        expect(thunk.api.put).toHaveBeenCalledTimes(1);
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR]);
    });

    test('validate error update', async () => {
        const thunk = new TestAsyncThunk(updateUserProfile, {
            profile: { form: { ...profileData, age: 0 } },
        });

        thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk('1');

        expect(thunk.api.put).toHaveBeenCalledTimes(0);
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([ValidateProfileError.INCORRECT_AGE]);
    });
});
