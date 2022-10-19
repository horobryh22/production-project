import { ReactElement, ReactNode } from 'react';

import { Provider } from 'react-redux';
import type { DeepPartial } from 'redux';

import { StateSchema } from '../config/StateSchema';
import { createReduxStore } from '../config/store';

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: DeepPartial<StateSchema>;
}

export const StoreProvider = (props: StoreProviderProps): ReactElement => {
    const { children, initialState } = props;

    const store = createReduxStore(initialState as StateSchema);

    return <Provider store={store}>{children}</Provider>;
};
