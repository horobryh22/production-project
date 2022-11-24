import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleSortType } from 'entities/Article';
import { SortOrder } from 'shared/types';

export const selectArticlesPageFilterOrder = (state: StateSchema): SortOrder =>
    state.articlesPageFilter?.order ?? SortOrder.DESC;

export const selectArticlesPageFilterSort = (state: StateSchema): ArticleSortType =>
    state.articlesPageFilter?.sort ?? ArticleSortType.CREATED;

export const selectArticlesPageFilterSearch = (state: StateSchema): string =>
    state.articlesPageFilter?.search ?? '';
