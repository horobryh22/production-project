import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { setJsonSettingsMutation } from '../../../api/userAPI';
import { jsonSettingsSelector } from '../../selectors/jsonSettings';
import { selectAuthData } from '../../selectors/selectAuthData/selectAuthData';
import type { JsonSettings, User } from '../../types';

export const saveJsonSettings = createAsyncThunk<
    JsonSettings,
    JsonSettings,
    ThunkConfig<string>
>(
    'user/saveJsonSettings',
    async (jsonSettings, { rejectWithValue, getState, dispatch }) => {
        try {
            const authData = selectAuthData(getState());
            const currentSettings = jsonSettingsSelector(getState()) ?? {};

            console.log({ currentSettings, authData });

            if (!authData.id) {
                return rejectWithValue('userId is empty!');
            }

            const result: User = await dispatch(
                setJsonSettingsMutation({
                    jsonSettings: {
                        ...currentSettings,
                        ...jsonSettings,
                    },
                    userId: authData.id,
                }),
            ).unwrap();

            if (!result.jsonSettings) {
                return rejectWithValue('error');
            }

            return result.jsonSettings;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
