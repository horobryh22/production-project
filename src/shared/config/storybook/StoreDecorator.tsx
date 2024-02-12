import { ReactElement } from 'react';

import type { ReducersMapObject } from '@reduxjs/toolkit';
import type { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types';

import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { articleDetailsReducer } from '@/entities/Article/testing';
import { commentFormReducer } from '@/entities/Comment/testing';
import { articleCommentsReducer } from '@/features/ArticleComments/testing';
import { articleInfiniteListReducer } from '@/features/ArticleInfiniteList/testing';
import { articleRecommendationsReducer } from '@/features/ArticleRecommendationsList/testing';
import { loginReducer } from '@/features/AuthByUserName';
import { profileReducer } from '@/features/EditableProfileCard';
import { viewSwitcherReducer } from '@/widgets/ViewSwitcher/testing';

import { ReducersList } from '../../lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader';

const defaultAsyncReducers: ReducersList = {
    login: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    commentForm: commentFormReducer,
    articleDetailsComments: articleCommentsReducer,
    articleRecommendations: articleRecommendationsReducer,
    articleInfiniteList: articleInfiniteListReducer,
    viewSwitcher: viewSwitcherReducer,
};

export const StoreDecorator =
    (
        initialState: DeepPartial<StateSchema>,
        asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>,
    ) =>
    (story: () => StoryFnReactReturnType): ReactElement => {
        const reducers = {
            ...defaultAsyncReducers,
            ...asyncReducers,
        };

        return (
            <StoreProvider initialState={initialState} asyncReducers={reducers}>
                {story()}
            </StoreProvider>
        );
    };
