import { StateSchema } from 'app/providers/StoreProvider';

export const selectUsername = (state: StateSchema): string => state.login.username;
