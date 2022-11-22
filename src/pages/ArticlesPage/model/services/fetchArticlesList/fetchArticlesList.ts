import { createAsyncThunk } from '@reduxjs/toolkit';

import { selectArticlePageLimitNum } from '../../selectors/articlePageSelectors';

import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';

interface FetchArticlesListProps {
    page: number;
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    FetchArticlesListProps,
    ThunkConfig<string>
>(
    'articlesPage/fetchArticlesList',
    async (props, { rejectWithValue, extra, getState }) => {
        const { page } = props;
        const limit = selectArticlePageLimitNum(getState());

        try {
            const { data } = await extra.api.get<Article[]>('/articles', {
                params: {
                    _page: page,
                    _limit: limit,
                    _expand: 'user',
                },
            });

            if (!data) {
                throw new Error();
            }

            return data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
