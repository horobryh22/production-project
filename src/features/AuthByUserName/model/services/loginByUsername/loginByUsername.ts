import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { StateSchema } from 'app/providers/StoreProvider';
import { User, userActions } from 'entities/User';
import { USER_LOCAL_STORAGE_KEY } from 'shared/const/localStorage';

export const loginByUsername = createAsyncThunk<
    User,
    void,
    { rejectValue: string; state: StateSchema }
>('login/loginByUsername', async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
        const username = getState().login.username;
        const password = getState().login.password;

        const { data } = await axios.post<User>('http://localhost:8000/login', {
            username,
            password,
        });

        if (!data) {
            throw new Error();
        }

        localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(data));
        dispatch(userActions.setAuthData(data));
    } catch (e) {
        return rejectWithValue('error');
    }
});
