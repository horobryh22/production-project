import { ArticleSortType } from 'entities/Article';
import { ArticleType } from 'entities/Article/model/types';
import { SortOrder } from 'shared/types';

export interface ArticlesPageURLParams {
    search: string;
    order: SortOrder;
    sort: ArticleSortType;
    typeTab: ArticleType;
}

export interface ArticlesPageFilterSchema {
    order: SortOrder;
    sort: ArticleSortType;
    search: string;
    typeTab: ArticleType;
    _inited: boolean;
}
