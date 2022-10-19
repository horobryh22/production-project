import React, { ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

import { Counter } from 'entities/Counter';

const MainPage = (): ReactElement => {
    const { t } = useTranslation('main');

    return (
        <div>
            {t('Main page', { ns: 'main' })}
            <Counter />
        </div>
    );
};

export default MainPage;
