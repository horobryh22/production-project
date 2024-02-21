import { useSelector } from 'react-redux';

import { StateSchema } from '@/app/providers/StoreProvider';

type Selector<T> = (state: StateSchema) => T;
type Result<T> = [() => T, Selector<T>];

// TODO подумать, чтобы расширить этот хук под createSelector из библиотеки reselect
//  и применить его во всем проекте вместо useSelector

export function buildSelector<T>(selector: Selector<T>): Result<T> {
    const useSelectorHook = (): T => {
        return useSelector(selector);
    };

    return [useSelectorHook, selector];
}
