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
    }),
});

export const setJsonSettingsMutation = userAPI.endpoints.setJsonSettings.initiate;
