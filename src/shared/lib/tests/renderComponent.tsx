import { ReactNode, Suspense } from 'react';

import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router';

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
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider initialState={initialState}>
                <I18nextProvider i18n={i18nForTests}>
                    <Suspense fallback="">{component}</Suspense>
                </I18nextProvider>
            </StoreProvider>
        </MemoryRouter>,
    );
};
