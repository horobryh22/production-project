import { fetchProfileData } from './fetchProfileData';

import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk';

const data = {
    age: 28,
    country: Country.RUSSIA,
    lastname: 'Хоробрых',
    username: 'admin',
    currency: Currency.RUB,
    avatar: 'https://cdn.icon-icons.com/icons2/1371/PNG/512/batman_90804.png',
    city: 'Omsk',
    first: 'Илья',
};

describe('fetchProfileData.test', () => {
    test('success fetching data', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);

        thunk.api.get.mockReturnValue(Promise.resolve({ data }));
        const result = await thunk.callThunk();

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });
    test('error with fetching data', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);

        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk();

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
    });
});
