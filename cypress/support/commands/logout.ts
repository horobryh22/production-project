import { USER_LOCAL_STORAGE_KEY } from '../../../src/shared/const/localStorage';

export const logout = (): void => {
    localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
};
