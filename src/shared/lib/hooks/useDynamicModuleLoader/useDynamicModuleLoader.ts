import { useEffect } from 'react';

import type { Reducer } from '@reduxjs/toolkit';
import { useStore } from 'react-redux';

import { StateSchema, StateSchemaKey, StoreSchema } from '@/app/providers/StoreProvider';

import { useAppDispatch } from '../useAppDispatch/useAppDispatch';

export type ReducersList = {
    [reducerKey in StateSchemaKey]?: Reducer<NonNullable<StateSchema[reducerKey]>>;
};

export const useDynamicModuleLoader = (
    reducers: ReducersList,
    removeAfterUnmount = true,
): void => {
    const store = useStore() as StoreSchema;
    const dispatch = useAppDispatch();

    useEffect(() => {
        const mountedReducers = store.reducerManager?.getReducerMap();

        Object.entries(reducers).forEach(([reducerKey, reducer]) => {
            const mounted = mountedReducers?.[reducerKey as StateSchemaKey];

            if (!mounted) {
                store.reducerManager?.add(reducerKey as StateSchemaKey, reducer);
                dispatch({ type: `@INIT ${reducerKey} reducer` });
            }
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
