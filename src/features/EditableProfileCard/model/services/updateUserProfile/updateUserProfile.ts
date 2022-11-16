import { createAsyncThunk } from '@reduxjs/toolkit';

import { selectProfileFormData } from '../../selectors/selectProfileFormData/selectProfileFormData';
import { ValidateProfileError } from '../../types';
import { validateProfileData } from '../validateProfileData/validateProfileData';

import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from 'entities/Profile';

export const updateUserProfile = createAsyncThunk<
    Profile,
    string,
    ThunkConfig<ValidateProfileError[]>
>(
    'profile/updateUserProfile',
    async (profileId, { rejectWithValue, extra, getState }) => {
        try {
            const formData = selectProfileFormData(getState());

            const errors = validateProfileData(formData);

            if (errors?.length) {
                return rejectWithValue(errors);
            }

            const { data } = await extra.api.put<Profile>(
                `/profile/${profileId}`,
                formData,
            );

            if (!data) {
                throw new Error();
            }

            return data;
        } catch (e) {
            return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
        }
    },
);
