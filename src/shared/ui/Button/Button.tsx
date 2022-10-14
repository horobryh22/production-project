import { ButtonHTMLAttributes, FC } from 'react';

import classes from './Button.module.scss';

import { classNames } from 'shared/lib/classNames/classNames';

export enum ButtonTheme {
    CLEAR = 'clear',
    OUTLINE = 'outline',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ButtonTheme;
    square?: boolean;
    size?: ButtonSize;
}

export const Button: FC<ButtonProps> = props => {
    const { children, className, theme, square, size, ...restProps } = props;

    const mods: Record<string, boolean> = {
        [classes.square]: square,
    };

    return (
        <button
            type={'button'}
            {...restProps}
            className={classNames(classes.Button, mods, [
                className,
                classes[theme],
                classes[size],
            ])}
        >
            {children}
        </button>
    );
};
