import { StateSchema } from 'app/providers/StoreProvider';

export const selectArticleCommentsIsLoading = (state: StateSchema) =>
    state.articleDetailsComments?.isLoading;
