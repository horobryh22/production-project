import { ReactNode } from 'react';

import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router';
import type { DeepPartial } from 'redux';

import i18nForTests from '../../config/i18n/i18nForTests';

import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';

export interface renderComponentOptions {
    route?: string;
    initialState?: DeepPartial<StateSchema>;
}

export const renderComponent = (
    component: ReactNode,
    options: renderComponentOptions = {},
): ReactNode => {
    const { route = '/', initialState } = options;

    return render(
        <StoreProvider initialState={initialState}>
            <MemoryRouter initialEntries={[route]}>
                <I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>
            </MemoryRouter>
        </StoreProvider>,
    );
};
