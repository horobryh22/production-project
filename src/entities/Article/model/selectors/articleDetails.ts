import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/store/buildSelector';

export const [useArticleDetailsData, selectArticleDetailsData] = buildSelector(
    (state: StateSchema) => state.articleDetails?.data,
);

export const [useArticleDetailsError, selectArticleDetailsError] = buildSelector(
    (state: StateSchema) => state.articleDetails?.error,
);

export const [useArticleDetailsIsLoading, selectArticleDetailsIsLoading] = buildSelector(
    (state: StateSchema) => state.articleDetails?.isLoading,
);
