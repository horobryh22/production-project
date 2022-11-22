import type { EntityState } from '@reduxjs/toolkit';

import { Article, ArticleView } from 'entities/Article';

export interface ArticlePageSchema extends EntityState<Article> {
    view: ArticleView;
    isLoading: boolean;
    error?: string;
    hasMore: boolean;
    page: number;
    limit?: number;
}
