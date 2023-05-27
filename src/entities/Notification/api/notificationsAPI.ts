import { Notification } from '../model/types';

import { rtkApi } from 'shared/api/rtkApi';

const notificationsAPI = rtkApi.injectEndpoints({
    endpoints: build => ({
        fetchNotifications: build.query<Notification[], string>({
            query: userId => ({
                url: '/notifications',
                params: {
                    userId,
                    _expand: 'user',
                },
            }),
        }),
    }),
});

export const useNotifications = notificationsAPI.useFetchNotificationsQuery;
