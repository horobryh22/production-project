import { createAsyncThunk } from '@reduxjs/toolkit';

import { selectArticlePageLimitNum } from '../../selectors/articlePageSelectors';

import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import {
    selectArticlesPageFilterOrder,
    selectArticlesPageFilterSort,
} from 'features/ArticlesPageFilter';

export interface FetchArticlesListProps {
    page: number;
    replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    FetchArticlesListProps,
    ThunkConfig<string>
>(
    'articlesPage/fetchArticlesList',
    async (props, { rejectWithValue, extra, getState }) => {
        const { page = 1 } = props;
        const limit = selectArticlePageLimitNum(getState());
        const sort = selectArticlesPageFilterSort(getState());
        const order = selectArticlesPageFilterOrder(getState());

        try {
            const { data } = await extra.api.get<Article[]>('/articles', {
                params: {
                    _page: page,
                    _limit: limit,
                    _sort: sort,
                    _order: order,
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
