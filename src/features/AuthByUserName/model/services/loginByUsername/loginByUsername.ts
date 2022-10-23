import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { User, userActions } from 'entities/User';
import { USER_LOCAL_STORAGE_KEY } from 'shared/const/localStorage';

interface UserData {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<User, UserData, { rejectValue: string }>(
    'login/loginByUsername',
    async ({ username, password }, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await axios.post<User>('http://localhost:8000/login', {
                username,
                password,
            });

            if (!data) {
                throw new Error();
            }

            localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(data));
            dispatch(userActions.setAuthData(data));

            return data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
