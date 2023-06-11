import { StateSchema } from '@/app/providers/StoreProvider';

export const selectAuthData = (state: StateSchema) => state.user.authData;
