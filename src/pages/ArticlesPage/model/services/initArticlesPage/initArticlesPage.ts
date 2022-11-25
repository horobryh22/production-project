import { createAsyncThunk } from '@reduxjs/toolkit';

import { selectArticlePageInited } from '../../selectors/articlePageSelectors';
import { articlePageActions } from '../../slice/articlePageSlice';

import { ThunkConfig } from 'app/providers/StoreProvider';

export const initArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
    'articlesPage/initArticlesPage',
    async (_, { dispatch, getState }) => {
        const _inited = selectArticlePageInited(getState());

        if (!_inited) {
            dispatch(articlePageActions.initState());
        }
    },
);
