import { configureStore } from '@reduxjs/toolkit';
import type { ReducersMapObject, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { StateSchema } from '../config/StateSchema';

import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { loginReducer } from 'features/AuthByUserName';

export const createReduxStore = (
    initialState?: StateSchema,
): ReturnType<typeof configureStore> => {
    const rootReducers: ReducersMapObject<StateSchema> = {
        login: loginReducer,
        user: userReducer,
        counter: counterReducer,
    };

    return configureStore<StateSchema>({
        reducer: rootReducers,
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });
};

// temporary solve
type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;
export const useAppDispatch = (): any => useDispatch<TypedDispatch<StateSchema>>();
