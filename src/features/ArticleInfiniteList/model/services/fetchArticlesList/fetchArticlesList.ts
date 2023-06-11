import { createAsyncThunk } from '@reduxjs/toolkit';

import { selectInfiniteListLimit } from '../../selectors/articleInfiniteListSelectors';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article, ArticleType } from '@/entities/Article';
import {
    selectArticlesPageFilterOrder,
    selectArticlesPageFilterSearch,
    selectArticlesPageFilterSort,
    selectArticlesPageFilterTypeTab,
} from '@/features/ArticlesPageFilter';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';

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
        const limit = selectInfiniteListLimit(getState());
        const sort = selectArticlesPageFilterSort(getState());
        const order = selectArticlesPageFilterOrder(getState());
        const search = selectArticlesPageFilterSearch(getState());
        const typeTab = selectArticlesPageFilterTypeTab(getState());

        try {
            addQueryParams({ sort, order, search, typeTab });
            const { data } = await extra.api.get<Article[]>('/articles', {
                params: {
                    _page: page,
                    _limit: limit,
                    _sort: sort,
                    _order: order,
                    q: search,
                    type: typeTab === ArticleType.ALL ? undefined : typeTab,
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
