import { createAsyncThunk } from '@reduxjs/toolkit';

import { selectArticlesPageFilterInited } from '../../selectors/articlesPageFilterSelectors';
import { articlesPageFilterActions } from '../../slice/articlesPageFilterSlice';

import { ThunkConfig } from 'app/providers/StoreProvider';
import { ArticleSortType } from 'entities/Article';
import { ArticleType } from 'entities/Article/model/types';
import { SortOrder } from 'shared/types';

export const initArticlesPageFilter = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>(
    'articlesPageFilter/initArticlePageFilter',
    async (searchParams, { dispatch, getState }) => {
        const sort = searchParams.get('sort') || ArticleSortType.CREATED;
        const order = searchParams.get('order') || SortOrder.DESC;
        const search = searchParams.get('search') || '';
        const typeTab = searchParams.get('typeTab') || ArticleType.ALL;
        const _inited = selectArticlesPageFilterInited(getState());

        if (!_inited) {
            dispatch(
                articlesPageFilterActions.initState({
                    order: order as SortOrder,
                    sort: sort as ArticleSortType,
                    typeTab: typeTab as ArticleType,
                    search,
                }),
            );
        }
    },
);
