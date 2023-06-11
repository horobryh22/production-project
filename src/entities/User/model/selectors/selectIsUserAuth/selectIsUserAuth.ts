import { StateSchema } from '@/app/providers/StoreProvider';

export const selectIsUserAuth = (state: StateSchema): boolean => state.user.isUserAuth;
