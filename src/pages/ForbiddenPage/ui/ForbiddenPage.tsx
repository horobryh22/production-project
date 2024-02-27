import React, { ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';

export const ForbiddenPage = (): ReactElement => {
    const { t } = useTranslation('forbidden');

    return (
        <Page data-testid={'ForbiddenPage'}>
            {t('Forbidden page', { ns: 'forbidden' })}
        </Page>
    );
};
