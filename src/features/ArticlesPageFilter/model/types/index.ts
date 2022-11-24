import { ArticleSortType } from 'entities/Article';
import { SortOrder } from 'shared/types';

export interface ArticlesPageFilterSchema {
    order: SortOrder;
    sort: ArticleSortType;
    search: string;
}
