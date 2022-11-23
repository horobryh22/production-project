import { ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

import classes from './NotFoundPage.module.scss';

import { classNames } from 'shared/lib';
import { Page } from 'widgets/Page';

interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage = ({ className }: NotFoundPageProps): ReactElement => {
    const { t } = useTranslation('not-found');

    return (
        <Page className={classNames(classes.NotFoundPage, {}, [className])}>
            {t('Page not found', { ns: 'not-found' })}
        </Page>
    );
};
