import { StateSchema } from 'app/providers/StoreProvider';

export const selectInitialized = (state: StateSchema): boolean =>
    state?.user?._initialized;
