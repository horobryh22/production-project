import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleSortType, ArticleType } from 'entities/Article';
import { SortOrder } from 'shared/types';

export const selectArticlesPageFilterOrder = (state: StateSchema): SortOrder =>
    state.articlesPageFilter?.order ?? SortOrder.DESC;

export const selectArticlesPageFilterSort = (state: StateSchema): ArticleSortType =>
    state.articlesPageFilter?.sort ?? ArticleSortType.CREATED;

export const selectArticlesPageFilterSearch = (state: StateSchema): string =>
    state.articlesPageFilter?.search ?? '';

export const selectArticlesPageFilterInited = (state: StateSchema) =>
    state.articlesPageFilter?._inited;

export const selectArticlesPageFilterTypeTab = (state: StateSchema): ArticleType =>
    state.articlesPageFilter?.typeTab || ArticleType.ALL;
