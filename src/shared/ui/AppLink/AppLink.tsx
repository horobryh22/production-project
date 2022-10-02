import {classNames} from 'shared';
import classes from './AppLink.module.scss';
import {NavLink, NavLinkProps} from 'react-router-dom';
import {FC} from 'react';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary'
}

interface AppLinkProps extends NavLinkProps {
    className?: string;
    theme: AppLinkTheme
}

export const AppLink: FC<AppLinkProps> = (props) => {

    const {to, children, className, theme, ...restProps} = props;

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