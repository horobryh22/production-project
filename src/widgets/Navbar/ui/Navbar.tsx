import React, { ReactElement } from 'react';

import classes from './Navbar.module.scss';

import { classNames } from 'shared/lib';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps): ReactElement => {
    return (
        <div className={classNames(classes.Navbar, {}, [String(className)])}>
            <div className={classes.links}>/</div>
        </div>
    );
};
