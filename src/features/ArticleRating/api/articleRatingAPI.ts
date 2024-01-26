import type { Rating } from '@/entities/Rating';
import { rtkApi } from '@/shared/api/rtkApi';

interface FetchArticleRatingArgs {
    userId: string;
    articleId: string;
}

interface RateArticleArgs extends Rating {
    userId: string;
    articleId: string;
}

const articleRatingAPI = rtkApi.injectEndpoints({
    endpoints: build => ({
        // query - запрос за данными (GET)
        fetchArticleRating: build.query<Rating[], FetchArticleRatingArgs>({
            query: ({ articleId, userId }) => ({
                url: '/article-rating',
                params: {
                    articleId,
                    userId,
                },
            }),
        }),
        // mutation - изменение данных (POST, PUT, DELETE, PATCH)
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
