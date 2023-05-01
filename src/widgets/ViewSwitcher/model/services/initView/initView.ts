import { createAsyncThunk } from '@reduxjs/toolkit';

import { selectViewSwitcherInited } from '../../selectors/viewSwitcherSelectors';
import { viewSwitcherActions } from '../../slice/viewSwitcherSlice';

import { ThunkConfig } from 'app/providers/StoreProvider';

export const initView = createAsyncThunk<void, void, ThunkConfig<string>>(
    'viewSwitcher/initView',
    async (_, { dispatch, getState }) => {
        const _inited = selectViewSwitcherInited(getState());

        if (!_inited) {
            dispatch(viewSwitcherActions.initView());
        }
    },
);
