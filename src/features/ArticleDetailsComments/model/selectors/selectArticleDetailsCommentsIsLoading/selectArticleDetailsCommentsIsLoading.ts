import { StateSchema } from 'app/providers/StoreProvider';

export const selectArticleDetailsCommentsIsLoading = (state: StateSchema) =>
    state.articleDetailsComments?.isLoading;
