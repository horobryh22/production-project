import { StateSchema } from 'app/providers/StoreProvider';

export const selectArticlePageIsLoading = (state: StateSchema) =>
    state.articlePage?.isLoading;

export const selectArticlePageHasMore = (state: StateSchema) =>
    state.articlePage?.hasMore;

export const selectArticlePageError = (state: StateSchema) => state.articlePage?.error;

export const selectArticlePageView = (state: StateSchema) => state.articlePage?.view;

export const selectArticlePagePageNum = (state: StateSchema) =>
    state.articlePage?.page || 1;

export const selectArticlePageLimitNum = (state: StateSchema) => state.articlePage?.limit;
