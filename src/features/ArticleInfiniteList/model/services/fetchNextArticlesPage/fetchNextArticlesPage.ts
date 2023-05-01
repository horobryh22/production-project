import { createAsyncThunk } from '@reduxjs/toolkit';

import {
    selectInfiniteListHasMore,
    selectInfiniteListPageNum,
    selectInfiniteListIsLoading,
} from '../../selectors/articleInfiniteListSelectors';
import { articleInfiniteListActions } from '../../slice/articleInfiniteListSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

import { ThunkConfig } from 'app/providers/StoreProvider';

export const fetchNextArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
    'articlesPage/fetchNextArticlesPage',
    async (_, { dispatch, getState }) => {
        const page = selectInfiniteListPageNum(getState());
        const isLoading = selectInfiniteListIsLoading(getState());
        const hasMore = selectInfiniteListHasMore(getState());

        if (hasMore && !isLoading) {
            dispatch(articleInfiniteListActions.setPageNum(page + 1));
            dispatch(fetchArticlesList({ page: page + 1 }));
        }
    },
);
