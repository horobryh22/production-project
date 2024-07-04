import React, { ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';

const MainPage = (): ReactElement => {
    const { t } = useTranslation('main');

    return (
        <Page data-testid={'MainPage'}>
            <div>1111111111111111</div>
            {t('Main page', { ns: 'main' })}
        </Page>
    );
};

export default MainPage;
