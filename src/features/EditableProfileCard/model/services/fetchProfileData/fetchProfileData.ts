import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '@/entities/Profile';

export const fetchProfileData = createAsyncThunk<Profile, string, ThunkConfig<string>>(
    'profile/fetchProfileData',
    async (profileId, { rejectWithValue, extra }) => {
        try {
            const { data } = await extra.api.get<Profile>(`/profile/${profileId}`);

            if (!data) {
                throw new Error();
            }

            return data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
