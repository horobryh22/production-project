import { StateSchema } from '@/app/providers/StoreProvider';

export const selectArticleCommentsError = (state: StateSchema) =>
    state.articleDetailsComments?.error;
