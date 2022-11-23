import { createAsyncThunk } from '@reduxjs/toolkit';

import {
    selectArticlePageInited,
    selectArticlePagePageNum,
} from '../../selectors/articlePageSelectors';
import { articlePageActions } from '../../slice/articlePageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

import { ThunkConfig } from 'app/providers/StoreProvider';

export const initArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
    'articlesPage/initArticlesPage',
    async (_, { dispatch, getState }) => {
        const page = selectArticlePagePageNum(getState());
        const _inited = selectArticlePageInited(getState());

        if (!_inited) {
            dispatch(articlePageActions.initState());
            dispatch(fetchArticlesList({ page }));
        }
    },
);
