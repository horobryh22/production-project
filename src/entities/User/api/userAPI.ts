import { rtkApi } from '@/shared/api/rtkApi';

import type { JsonSettings, User } from '../model/types';

interface SetJsonSettingsParams {
    userId: string;
    jsonSettings: JsonSettings;
}

const userAPI = rtkApi.injectEndpoints({
    endpoints: build => ({
        setJsonSettings: build.mutation<User, SetJsonSettingsParams>({
            query: ({ userId, jsonSettings }) => ({
                url: `/users/${userId}`,
                method: 'PATCH',
                body: {
                    jsonSettings,
                },
            }),
        }),
        getAuthUserData: build.query<User, string>({
            query: userId => ({
                url: `/users/${userId}`,
                method: 'GET',
            }),
        }),
    }),
});

export const setJsonSettingsMutation = userAPI.endpoints.setJsonSettings.initiate;
export const getAuthUserDataQuery = userAPI.endpoints.getAuthUserData.initiate;
