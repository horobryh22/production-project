import { StateSchema } from 'app/providers/StoreProvider';

export const selectIsLoading = (state: StateSchema): boolean => state.login.isLoading;
