import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';
import { User, userActions } from 'entities/User';
import { USER_LOCAL_STORAGE_KEY } from 'shared/const/localStorage';

interface UserData {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<User, UserData, ThunkConfig<string>>(
    'login/loginByUsername',
    async ({ username, password }, { rejectWithValue, dispatch, extra }) => {
        try {
            const { data } = await extra.api.post<User>('/login', {
                username,
                password,
            });

            if (!data) {
                throw new Error();
            }

            localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(data));
            dispatch(userActions.setAuthData(data));

            extra.navigate?.('/profile');

            return data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
