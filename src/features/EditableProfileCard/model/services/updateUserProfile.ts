import { createAsyncThunk } from '@reduxjs/toolkit';

import { selectProfileFormData } from '../selectors/selectProfileFormData/selectProfileFormData';

import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from 'entities/Profile';

export const updateUserProfile = createAsyncThunk<Profile, void, ThunkConfig<string>>(
    'profile/updateUserProfile',
    async (_, { rejectWithValue, extra, getState }) => {
        try {
            const formData = selectProfileFormData(getState());

            const { data } = await extra.api.put<Profile>('/profile', formData);

            if (!data) {
                throw new Error();
            }

            return data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
