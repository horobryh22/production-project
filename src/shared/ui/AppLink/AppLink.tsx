import { ReactElement } from 'react';

import type { NavLinkProps } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import { classNames } from '@/shared/lib';

import classes from './AppLink.module.scss';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

interface AppLinkProps extends NavLinkProps {
    className?: string;
    theme?: AppLinkTheme;
}

export const AppLink = (props: AppLinkProps): ReactElement => {
    const { to, children, className, theme = AppLinkTheme.PRIMARY, ...restProps } = props;

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
