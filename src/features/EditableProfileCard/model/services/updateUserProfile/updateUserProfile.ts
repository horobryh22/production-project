import { createAsyncThunk } from '@reduxjs/toolkit';

import { selectProfileFormData } from '../../selectors/selectProfileFormData/selectProfileFormData';
import { ValidateProfileError } from '../../types';
import { validateProfileData } from '../validateProfileData/validateProfileData';

import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from 'entities/Profile';

export const updateUserProfile = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<ValidateProfileError[]>
>('profile/updateUserProfile', async (_, { rejectWithValue, extra, getState }) => {
    try {
        const formData = selectProfileFormData(getState());

        const errors = validateProfileData(formData);

        if (errors?.length) {
            return rejectWithValue(errors);
        }

        const { data } = await extra.api.put<Profile>('/profile', formData);

        if (!data) {
            throw new Error();
        }

        return data;
    } catch (e) {
        return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
    }
});
