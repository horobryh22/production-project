import React, { ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';

const AdminPage = (): ReactElement => {
    const { t } = useTranslation('admin');

    return <Page>{t('Admin page', { ns: 'admin' })}</Page>;
};

export default AdminPage;
