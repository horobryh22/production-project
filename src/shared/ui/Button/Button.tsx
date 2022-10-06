import { ButtonHTMLAttributes, FC } from 'react';

import classes from './Button.module.scss';

import { classNames } from 'shared/lib';

export enum ThemeButton {
    CLEAR = 'clear',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ThemeButton;
}

export const Button: FC<ButtonProps> = props => {
    const { children, className, theme, ...restProps } = props;

    return (
        <button
            type={'button'}
            {...restProps}
            className={classNames(classes.Button, {}, [
                String(className),
                classes[String(theme)],
            ])}
        >
            {children}
        </button>
    );
};
