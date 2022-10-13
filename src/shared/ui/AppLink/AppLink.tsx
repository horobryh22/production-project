import { FC } from 'react';

import type { NavLinkProps } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import classes from './AppLink.module.scss';

import { classNames } from 'shared/lib';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

interface AppLinkProps extends NavLinkProps {
    className?: string;
    theme?: AppLinkTheme;
}

export const AppLink: FC<AppLinkProps> = props => {
    const { to, children, className, theme, ...restProps } = props;

    return (
        <NavLink
            {...restProps}
            to={to}
            className={classNames(classes.AppLink, {}, [className, classes[theme]])}
        >
            {children}
        </NavLink>
    );
};
