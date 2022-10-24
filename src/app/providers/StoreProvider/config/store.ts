import type { AnyAction, Middleware, ReducersMapObject } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import type { NavigateFunction } from 'react-router/dist/lib/hooks';

import { ReducerManager, StateSchema, StoreSchema } from '../config/StateSchema';

import { createReducerManager } from './reducerManager';

import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { instance } from 'shared/api/api';

export const createReduxStore = (
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
    navigate?: NavigateFunction,
): StoreSchema => {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
        counter: counterReducer,
    };

    const reducerManager: ReducerManager = createReducerManager(rootReducers);

    const store: StoreSchema = configureStore<
        StateSchema,
        AnyAction,
        ReadonlyArray<Middleware<{}, StateSchema>>
    >({
        reducer: reducerManager.reduce,
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
