import { useEffect } from 'react';

import type { Reducer } from '@reduxjs/toolkit';
import { useStore } from 'react-redux';

import { StateSchemaKey, StoreSchema } from 'app/providers/StoreProvider';
import { useAppDispatch } from 'app/providers/StoreProvider/config/store';

type ReducerItem = [StateSchemaKey, Reducer];

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
        Object.entries(reducers).forEach(([reducerKey, reducer]: ReducerItem) => {
            store.reducerManager.add(reducerKey, reducer);
            dispatch({ type: `@INIT ${reducerKey} reducer` });
        });

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([reducerKey]: ReducerItem) => {
                    store.reducerManager.remove(reducerKey);
                    dispatch({ type: `@DESTROY ${reducerKey} reducer` });
                });
            }
        };

        // eslint-disable-next-line
    }, []);
};
