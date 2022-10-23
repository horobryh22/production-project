import type { AsyncThunkAction } from '@reduxjs/toolkit';
import type { Dispatch } from 'redux';

import { StateSchema } from 'app/providers/StoreProvider';

type ActionCreatorType<Return, Arg, RejectValue> = (
    arg: Arg,
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectValue }>;

export class TestAsyncThunk<Return, Arg, RejectValue> {
    dispatch: Dispatch;
    getState: () => StateSchema;
    actionCreator: ActionCreatorType<Return, Arg, RejectValue>;

    constructor(actionCreator: ActionCreatorType<Return, Arg, RejectValue>) {
        this.dispatch = jest.fn();
        this.getState = jest.fn();
        this.actionCreator = actionCreator;
    }

    async callThunk(arg: Arg) {
        const action = this.actionCreator(arg);
        const result = await action(this.dispatch, this.getState, undefined);

        return result;
    }
}
