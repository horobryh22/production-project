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
import { UserSchema } from 'entities/User';
import { AddCommentFormSchema } from 'features/AddCommentForm';
import { ArticleDetailsCommentsSchema } from 'features/ArticleDetailsComments';
import { LoginSchema } from 'features/AuthByUserName';
import { ProfileSchema } from 'features/EditableProfileCard';

// instead of RootState
export interface StateSchema {
    user: UserSchema;

    // async reducers
    login?: LoginSchema;
    profile?: ProfileSchema;
    articleDetails?: ArticleDetailsSchema;
    articleDetailsComments?: ArticleDetailsCommentsSchema;
    addCommentForm?: AddCommentFormSchema;
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
