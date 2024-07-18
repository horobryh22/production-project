import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { USER_LOCAL_STORAGE_KEY } from '@/shared/const/localStorage';

import { getAuthUserDataQuery } from '../../../api/userAPI';
import type { User } from '../../types';

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
    'user/initAuthData',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const userId = localStorage.getItem(USER_LOCAL_STORAGE_KEY);

            if (!userId) {
                return rejectWithValue('userId is not found!');
            }

            const user: User = await dispatch(getAuthUserDataQuery(userId)).unwrap();

            if (!user) {
                return rejectWithValue('error');
            }

            return user;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
