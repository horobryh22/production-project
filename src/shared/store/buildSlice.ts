import { useMemo } from 'react';

import {
    ActionCreator,
    bindActionCreators,
    createSlice,
    CreateSliceOptions,
    SliceCaseReducers,
} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

export function buildSlice<
    State,
    CaseReducers extends SliceCaseReducers<State>,
    Name extends string = string,
>(options: CreateSliceOptions<State, CaseReducers, Name>) {
    const slice = createSlice(options);

    const useActions = (): typeof slice.actions => {
        const dispatch = useDispatch();

        return useMemo(
            () =>
                bindActionCreators<ActionCreator<CaseReducers>, any>(
                    slice.actions,
                    dispatch,
                ),
            [dispatch],
        );
    };

    return {
        ...slice,
        useActions,
    };
}
