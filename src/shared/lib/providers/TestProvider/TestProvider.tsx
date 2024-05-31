import { ReactNode, Suspense } from 'react';

import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router';

// eslint-disable-next-line fsd-plugin/layer-imports
import '@/app/styles/index.scss';
import { StoreProvider } from '@/app/providers/StoreProvider';
// eslint-disable-next-line fsd-plugin/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider';

import i18nForTests from '../../../config/i18n/i18nForTests';
import type { RenderComponentOptions } from '../../tests/renderComponent';

interface TestProviderType {
    options: RenderComponentOptions;
    children: ReactNode;
}

/* Провайдер используется для тестирования (доступ к данным, стору, теме) в средах jest и cypress (браузер) */

export const TestProvider = ({ children, options }: TestProviderType): JSX.Element => {
    const { route = '/', initialState, asyncReducers } = options;

    return (
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider initialState={initialState} asyncReducers={asyncReducers}>
                <ThemeProvider>
                    <I18nextProvider i18n={i18nForTests}>
                        <Suspense fallback="">{children}</Suspense>
                    </I18nextProvider>
                </ThemeProvider>
            </StoreProvider>
        </MemoryRouter>
    );
};
