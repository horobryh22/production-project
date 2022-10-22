import type { AnyAction, ReducersMapObject, ThunkDispatch } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { ReducerManager, StateSchema, StoreSchema } from '../config/StateSchema';

import { createReducerManager } from './reducerManager';

import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';

export const createReduxStore = (
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
): StoreSchema => {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
        counter: counterReducer,
    };

    const reducerManager: ReducerManager = createReducerManager(rootReducers);

    const store: StoreSchema = configureStore<StateSchema>({
        reducer: reducerManager.reduce,
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });

    store.reducerManager = reducerManager;

    return store;
};

// temporary solve
type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;
export const useAppDispatch = (): any => useDispatch<TypedDispatch<StateSchema>>();
