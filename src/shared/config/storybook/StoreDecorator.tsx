import { ReactElement } from 'react';

import type { ReducersMapObject } from '@reduxjs/toolkit';
import type { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types';

import { ReducersList } from '../../lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader';

// TODO
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
// eslint-disable-next-line fsd-plugin/public-api-imports
import { articleDetailsReducer } from '@/entities/Article/model/slice/articleDetailsSlice';
// eslint-disable-next-line fsd-plugin/public-api-imports
import { commentFormReducer } from '@/entities/Comment/model/slice/commentFormSlice';
// eslint-disable-next-line fsd-plugin/public-api-imports
import { articleCommentsReducer } from '@/features/ArticleComments/model/slice/articleCommentsSlice';
// eslint-disable-next-line fsd-plugin/public-api-imports
import { articleInfiniteListReducer } from '@/features/ArticleInfiniteList/model/slice/articleInfiniteListSlice';
// eslint-disable-next-line fsd-plugin/public-api-imports
import { articleRecommendationsReducer } from '@/features/ArticleRecommendationsList/model/slices/articleRecommendationsSlice';
import { loginReducer } from '@/features/AuthByUserName';
import { profileReducer } from '@/features/EditableProfileCard';
// eslint-disable-next-line fsd-plugin/public-api-imports
import { viewSwitcherReducer } from '@/widgets/ViewSwitcher/model/slice/viewSwitcherSlice';

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
