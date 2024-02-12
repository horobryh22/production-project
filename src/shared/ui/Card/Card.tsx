import { HTMLAttributes, ReactElement, ReactNode } from 'react';

import { classNames } from '@/shared/lib';
import { Mods } from '@/shared/lib/classNames/classNames';

import classes from './Card.module.scss';

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINED = 'outlined',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    theme?: CardTheme;
    max?: boolean;
}

export const Card = (props: CardProps): ReactElement => {
    const { className, children, theme = CardTheme.NORMAL, max, ...restProps } = props;

    const mods: Mods = {
        [classes.maxWidth]: max,
    };

    return (
        <div
            {...restProps}
            className={classNames(classes.Card, mods, [className, classes[theme]])}
        >
            {children}
        </div>
    );
};
