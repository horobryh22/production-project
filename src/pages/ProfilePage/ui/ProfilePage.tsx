import React, { ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

import { profileReducer } from 'entities/Profile';
import { useDynamicModuleLoader } from 'shared/lib';
import { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader';

const INITIAL_REDUCERS: ReducersList = {
    profile: profileReducer,
};

const ProfilePage = (): ReactElement => {
    const { t } = useTranslation('profile');

    useDynamicModuleLoader(INITIAL_REDUCERS);

    return <div>{t('Profile page', { ns: 'profile' })}</div>;
};

export default ProfilePage;
