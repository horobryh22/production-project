import React from 'react';
import {classNames} from 'shared';
import classes from './Navbar.module.scss';
import {AppLink, AppLinkTheme} from 'shared/ui';
import {ThemeSwitcher} from 'widgets/ThemeSwitcher';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({className}: NavbarProps) => {

    return (
        <div className={classNames(classes.Navbar, {}, [className])}>
            <ThemeSwitcher/>
            <div className={classes.links}>
                <AppLink
                    theme={AppLinkTheme.SECONDARY}
                    to={'/'}
                    className={classes.mainLink}
                >
                    Main
                </AppLink>
                <AppLink
                    theme={AppLinkTheme.SECONDARY}
                    to={'/about'}
                >
                    About
                </AppLink>
            </div>
        </div>
    );
};
