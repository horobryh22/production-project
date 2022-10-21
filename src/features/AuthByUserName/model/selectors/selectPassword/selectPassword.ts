import { StateSchema } from 'app/providers/StoreProvider';

export const selectPassword = (state: StateSchema): string => state.login.password;
