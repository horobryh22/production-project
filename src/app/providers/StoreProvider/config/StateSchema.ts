import type {
    AnyAction,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import type { NavigateFunction } from 'react-router/dist/lib/hooks';
import type { CombinedState } from 'redux';

import { ArticleDetailsSchema } from 'entities/Article';
import { CommentFormSchema } from 'entities/Comment';
import { UserSchema } from 'entities/User';
import { ArticleCommentsSchema } from 'features/ArticleComments';
import { ArticleInfiniteListSchema } from 'features/ArticleInfiniteList';
import { ArticleRecommendationsSchema } from 'features/ArticleRecommendationsList';
import { ArticlesPageFilterSchema } from 'features/ArticlesPageFilter';
import { LoginSchema } from 'features/AuthByUserName';
import { ProfileSchema } from 'features/EditableProfileCard';
import { rtkApi } from 'shared/api/rtkApi';
import { UIPageSchema } from 'widgets/Page';
import { ViewSwitcherSchema } from 'widgets/ViewSwitcher';

// instead of RootState
export interface StateSchema {
    user: UserSchema;
    uiPage: UIPageSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

    // async reducers
    login?: LoginSchema;
    profile?: ProfileSchema;
    articleDetails?: ArticleDetailsSchema;
    articleDetailsComments?: ArticleCommentsSchema;
    articleRecommendations?: ArticleRecommendationsSchema;
    articlesPageFilter?: ArticlesPageFilterSchema;
    articleInfiniteList?: ArticleInfiniteListSchema;
    commentForm?: CommentFormSchema;
    viewSwitcher?: ViewSwitcherSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface StoreSchema extends EnhancedStore<StateSchema> {
    reducerManager?: ReducerManager;
}

export interface ThunkExtraArgs {
    api: AxiosInstance;
    navigate?: NavigateFunction;
}

export interface ThunkConfig<RejectValue> {
    rejectValue: RejectValue;
    extra: ThunkExtraArgs;
    state: StateSchema;
}
