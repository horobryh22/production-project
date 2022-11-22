import { createAsyncThunk } from '@reduxjs/toolkit';

import {
    selectArticlePageHasMore,
    selectArticlePageIsLoading,
    selectArticlePagePageNum,
} from '../../selectors/articlePageSelectors';
import { articlePageActions } from '../../slice/articlePageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

import { ThunkConfig } from 'app/providers/StoreProvider';

export const fetchNextArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
    'articlesPage/fetchNextArticlesPage',
    async (_, { dispatch, getState }) => {
        const page = selectArticlePagePageNum(getState());
        const isLoading = selectArticlePageIsLoading(getState());
        const hasMore = selectArticlePageHasMore(getState());

        if (hasMore && !isLoading) {
            dispatch(articlePageActions.setPageNum());
            dispatch(fetchArticlesList({ page: page + 1 }));
        }
    },
);
