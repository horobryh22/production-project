import { StateSchema } from 'app/providers/StoreProvider';

export const selectArticlePageError = (state: StateSchema) => state.articlePage?.error;
export const selectArticlePageLimitNum = (state: StateSchema) => state.articlePage?.limit;
export const selectArticlePageInited = (state: StateSchema) => state.articlePage?._inited;

export const selectArticlePageIsLoading = (state: StateSchema) =>
    state.articlePage?.isLoading;

export const selectArticlePageHasMore = (state: StateSchema) =>
    state.articlePage?.hasMore;

export const selectArticlePageView = (state: StateSchema) => state.articlePage?.view;

export const selectArticlePagePageNum = (state: StateSchema) =>
    state.articlePage?.page || 1;
