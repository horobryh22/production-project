import type { AnyAction, Middleware, ReducersMapObject } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import type { NavigateFunction } from 'react-router/dist/lib/hooks';
import type { CombinedState, Reducer } from 'redux';

import { ReducerManager, StateSchema, StoreSchema } from '../config/StateSchema';

import { createReducerManager } from './reducerManager';

import { userReducer } from 'entities/User';
import { instance } from 'shared/api/api';
import { uiPageSliceReducer } from 'widgets/Page';

export const createReduxStore = (
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
    navigate?: NavigateFunction,
): StoreSchema => {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
        uiPage: uiPageSliceReducer,
    };

    const reducerManager: ReducerManager = createReducerManager(rootReducers);

    const store: StoreSchema = configureStore<
        StateSchema,
        AnyAction,
        ReadonlyArray<Middleware<{}, StateSchema>>
    >({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                thunk: { extraArgument: { api: instance, navigate } },
            }),
    });

    store.reducerManager = reducerManager;

    return store;
};
