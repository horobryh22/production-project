import React, { ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

import { Page } from 'shared/ui';

const MainPage = (): ReactElement => {
    const { t } = useTranslation('main');

    return <Page>{t('Main page', { ns: 'main' })}</Page>;
};

export default MainPage;
