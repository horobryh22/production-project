import { ReactElement } from 'react';

import type { ReducersMapObject } from '@reduxjs/toolkit';
import type { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types';

import { ReducersList } from '../../lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader';

import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';
import { addCommentFormReducer } from 'features/AddCommentForm/model/slice/addCommentFormSlice';
import { articleDetailsCommentsReducer } from 'features/ArticleDetailsComments/model/slice/articleDetailsCommentsSlice';
import { articleRecommendationsReducer } from 'features/ArticleRecommendationsList/model/slices/articleRecommendationsSlice';
import { loginReducer } from 'features/AuthByUserName';
import { profileReducer } from 'features/EditableProfileCard';
import { articlePageReducer } from 'pages/ArticlesPage/model/slice/articlePageSlice';

const defaultAsyncReducers: ReducersList = {
    login: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    addCommentForm: addCommentFormReducer,
    articleDetailsComments: articleDetailsCommentsReducer,
    articlePage: articlePageReducer,
    articleRecommendations: articleRecommendationsReducer,
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
