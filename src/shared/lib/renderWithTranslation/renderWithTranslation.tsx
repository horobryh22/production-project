import { ReactNode } from 'react';

import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';

import i18nForTests from 'app/providers/i18n/config/i18nForTests';

export const renderWithTranslation = (component: ReactNode): ReactNode => {
    return render(<I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>);
};
