import { StateSchema } from 'app/providers/StoreProvider';

export const selectArticleDetailsCommentsError = (state: StateSchema) =>
    state.articleDetailsComments?.error;
