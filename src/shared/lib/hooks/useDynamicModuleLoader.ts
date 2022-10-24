import { useEffect } from 'react';

import type { Reducer } from '@reduxjs/toolkit';
import { useStore } from 'react-redux';

import { useAppDispatch } from '../hooks/useAppDispatch';

import { StateSchemaKey, StoreSchema } from 'app/providers/StoreProvider';

export type ReducersList = {
    [reducerKey in StateSchemaKey]?: Reducer;
};

export const useDynamicModuleLoader = (
    reducers: ReducersList,
    removeAfterUnmount = true,
): void => {
    const store = useStore() as StoreSchema;
    const dispatch = useAppDispatch();

    useEffect(() => {
        Object.entries(reducers).forEach(([reducerKey, reducer]) => {
            store.reducerManager?.add(reducerKey as StateSchemaKey, reducer);
            dispatch({ type: `@INIT ${reducerKey} reducer` });
        });

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([reducerKey]) => {
                    store.reducerManager?.remove(reducerKey as StateSchemaKey);
                    dispatch({ type: `@DESTROY ${reducerKey} reducer` });
                });
            }
        };

        // eslint-disable-next-line
    }, []);
};
