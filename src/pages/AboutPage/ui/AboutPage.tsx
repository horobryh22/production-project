import React, { ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

const AboutPage = (): ReactElement => {
    const { t } = useTranslation('about');

    return <div>{t('about:About page')}</div>;
};

export default AboutPage;
