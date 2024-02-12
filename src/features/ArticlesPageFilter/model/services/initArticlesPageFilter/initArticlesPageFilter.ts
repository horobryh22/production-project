import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ArticleSortType, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types';

import { selectArticlesPageFilterInited } from '../../selectors/articlesPageFilterSelectors';
import { articlesPageFilterActions } from '../../slice/articlesPageFilterSlice';

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
