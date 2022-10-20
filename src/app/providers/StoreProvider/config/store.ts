import { configureStore } from '@reduxjs/toolkit';
import type { ReducersMapObject } from '@reduxjs/toolkit';

import { StateSchema } from '../config/StateSchema';

import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';

export const createReduxStore = (
    initialState?: StateSchema,
): ReturnType<typeof configureStore> => {
    const rootReducers: ReducersMapObject<StateSchema> = {
        user: userReducer,
        counter: counterReducer,
    };

    return configureStore<StateSchema>({
        reducer: rootReducers,
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });
};
