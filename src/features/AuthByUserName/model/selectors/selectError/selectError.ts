import { StateSchema } from 'app/providers/StoreProvider';

export const selectError = (state: StateSchema): string | null =>
    state?.login?.error || null;
