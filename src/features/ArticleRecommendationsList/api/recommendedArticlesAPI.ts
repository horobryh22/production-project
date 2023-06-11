import { Article } from '@/entities/Article';
import { rtkApi } from '@/shared/api/rtkApi';

const recommendedArticlesAPI = rtkApi.injectEndpoints({
    endpoints: build => ({
        fetchRecommendedArticles: build.query<Article[], number>({
            query: limit => ({
                url: '/articles',
                params: {
                    _limit: limit,
                    _expand: 'user',
                },
            }),
        }),
    }),
});

export const useRecommendedArticles =
    recommendedArticlesAPI.useFetchRecommendedArticlesQuery;
