import type { EntityState } from '@reduxjs/toolkit';

import { Article } from 'entities/Article';

export interface ArticleInfiniteListSchema extends EntityState<Article> {
    isLoading: boolean;
    error?: string;
    hasMore: boolean;
    page: number;
    limit: number;
}
