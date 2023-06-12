import { ButtonHTMLAttributes, ReactElement } from 'react';

import classes from './Button.module.scss';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';

export enum ButtonTheme {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    OUTLINE_RED = 'outlineRed',
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
    fullWidth?: boolean;
}

export const Button = (props: ButtonProps): ReactElement => {
    const {
        children,
        className,
        theme = ButtonTheme.OUTLINE,
        square,
        size = ButtonSize.M,
        disabled,
        fullWidth,
        ...restProps
    } = props;

    const mods: Mods = {
        [classes.square]: square,
        [classes.disabled]: disabled,
        [classes.fullWidth]: fullWidth,
    };

    return (
        <button
            type={'button'}
            {...restProps}
            disabled={disabled}
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
