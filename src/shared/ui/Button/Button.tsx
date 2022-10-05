import {classNames} from 'shared';
import classes from './Button.module.scss';
import {ButtonHTMLAttributes, FC} from 'react';

export enum ThemeButton {
    CLEAR = 'clear',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ThemeButton
}

export const Button: FC<ButtonProps> = (props) => {

    const {children, className, theme, ...restProps} = props;

    return (
        <button
            {...restProps}
            className={classNames(classes.Button, {}, [className, classes[theme]])}
        >
            {children}
        </button>
    );
};