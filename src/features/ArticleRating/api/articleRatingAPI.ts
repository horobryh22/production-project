import { ArticleRating } from '../model/types';

import { rtkApi } from '@/shared/api/rtkApi';

interface FetchArticleRatingArgs {
    userId: string;
    articleId: string;
}

interface RateArticleArgs extends Omit<ArticleRating, 'id'> {
    userId: string;
    articleId: string;
}

const articleRatingAPI = rtkApi.injectEndpoints({
    endpoints: build => ({
        fetchArticleRating: build.query<ArticleRating[], FetchArticleRatingArgs>({
            query: ({ articleId, userId }) => ({
                url: '/article-rating',
                params: {
                    articleId,
                    userId,
                },
            }),
        }),
        rateArticle: build.mutation<void, RateArticleArgs>({
            query: args => ({
                url: '/article-rating',
                method: 'POST',
                body: args,
            }),
        }),
    }),
});

export const useArticleRating = articleRatingAPI.useFetchArticleRatingQuery;
export const useRateArticle = articleRatingAPI.useRateArticleMutation;
