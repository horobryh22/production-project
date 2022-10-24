// import axios from 'axios';

jest.mock('axios');

// const mockedAxios = jest.mocked(axios);

describe('loginByUsername.test', () => {
    test('test', () => {
        expect(true).toBeTruthy();
    });

    // test('success login', async () => {
    //     const userData: User = { id: '1', username: 'admin' };
    //
    //     mockedAxios.post.mockReturnValue(Promise.resolve({ data: userData }));
    //
    //     const thunk = new TestAsyncThunk(loginByUsername);
    //     const result = await thunk.callThunk({ username: 'admin', password: '123' });
    //
    //     expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userData));
    //     expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    //     expect(mockedAxios.post).toHaveBeenCalled();
    //     expect(result.meta.requestStatus).toBe('fulfilled');
    //     expect(result.payload).toEqual(userData);
    // });
    //
    // test('error login', async () => {
    //     mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
    //
    //     const thunk = new TestAsyncThunk(loginByUsername);
    //     const result = await thunk.callThunk({ username: 'admin', password: '123' });
    //
    //     expect(mockedAxios.post).toHaveBeenCalled();
    //     expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    //     expect(result.meta.requestStatus).toBe('rejected');
    //     expect(result.payload).toBe('error');
    // });
});
