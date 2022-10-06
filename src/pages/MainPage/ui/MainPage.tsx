import React from 'react';
import {useTranslation} from 'react-i18next';

const MainPage = () => {

    const {t} = useTranslation('main');

    return (
        <div>
            {t('main:Main page')}
        </div>
    );
};

export default MainPage;