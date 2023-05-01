import { StateSchema } from 'app/providers/StoreProvider';

export const selectInfiniteListError = (state: StateSchema) =>
    state.articleInfiniteList?.error;

export const selectInfiniteListIsLoading = (state: StateSchema) =>
    state.articleInfiniteList?.isLoading;

export const selectInfiniteListHasMore = (state: StateSchema) =>
    state.articleInfiniteList?.hasMore;

export const selectInfiniteListPageNum = (state: StateSchema) =>
    state.articleInfiniteList?.page || 1;

export const selectInfiniteListLimit = (state: StateSchema) =>
    state.articleInfiniteList?.limit || 8;
