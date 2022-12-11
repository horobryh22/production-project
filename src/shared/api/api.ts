import axios from 'axios';

import { USER_LOCAL_STORAGE_KEY } from 'shared/const/localStorage';

export const instance = axios.create({
    baseURL: __API__,
});

axios.interceptors.request.use(config => {
    if (config.headers) {
        config.headers.Authorization = localStorage.getItem(USER_LOCAL_STORAGE_KEY) || '';
    }

    return config;
});
