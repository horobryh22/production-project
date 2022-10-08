import React, { ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

const AboutPage = (): ReactElement => {
    const { t } = useTranslation('about');

    return <div>{t('About page', { ns: 'about' })}</div>;
};

export default AboutPage;
