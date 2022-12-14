import { StateSchema } from 'app/providers/StoreProvider';

export const selectCommentIsLoading = (state: StateSchema) =>
    state.addCommentForm?.isLoading;
