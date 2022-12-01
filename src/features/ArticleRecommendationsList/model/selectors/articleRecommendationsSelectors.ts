import { StateSchema } from 'app/providers/StoreProvider';

export const selectArticleRecommendationsError = (state: StateSchema) => {
    return state.articleRecommendations?.error;
};

export const selectArticleRecommendationsIsLoading = (state: StateSchema) => {
    return state.articleRecommendations?.isLoading;
};
