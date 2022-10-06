import React from 'react';
import classes from './Navbar.module.scss';
import {AppLink, AppLinkTheme} from 'shared/ui';
import {classNames} from 'shared/lib';
import {useTranslation} from 'react-i18next';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({className}: NavbarProps) => {

    const {t} = useTranslation();

    return (
        <div className={classNames(classes.Navbar, {}, [className])}>
            <div className={classes.links}>
                <AppLink
                    theme={AppLinkTheme.SECONDARY}
                    to={'/'}
                    className={classes.mainLink}
                >
                    {t('Main')}
                </AppLink>
                <AppLink
                    theme={AppLinkTheme.SECONDARY}
                    to={'/about'}
                >
                    {t('About')}
                </AppLink>
            </div>
        </div>
    );
};
