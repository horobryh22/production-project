import React, { ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

import classes from './Navbar.module.scss';

import { classNames } from 'shared/lib';
import { AppLink, AppLinkTheme } from 'shared/ui';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps): ReactElement => {
    const { t } = useTranslation();

    return (
        <div className={classNames('', {}, [String(className)])}>
            <div className={classes.links}>
                <AppLink
                    theme={AppLinkTheme.SECONDARY}
                    to={'/'}
                    className={classes.mainLink}
                >
                    {t('Main')}
                </AppLink>
                <AppLink theme={AppLinkTheme.SECONDARY} to="/about">
                    {t('About')}
                </AppLink>
            </div>
        </div>
    );
};
