import { ReactElement } from 'react';

import type { Story } from '@storybook/react';
import type { DeepPartial } from 'redux';

import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';

export const StoreDecorator =
    (initialState: DeepPartial<StateSchema>) =>
    (story: () => Story): ReactElement => {
        return <StoreProvider initialState={initialState}>{story()}</StoreProvider>;
    };
