import React from 'react';
import classes from './Navbar.module.scss';
import {AppLink, AppLinkTheme} from 'shared/ui';
import {classNames} from 'shared/lib';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({className}: NavbarProps) => {

    return (
        <div className={classNames(classes.Navbar, {}, [className])}>
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
