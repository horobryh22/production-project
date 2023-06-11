import { HTMLAttributes, ReactElement, ReactNode } from 'react';

import classes from './Card.module.scss';

import { classNames } from '@/shared/lib';

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINED = 'outlined',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    theme?: CardTheme;
}

export const Card = (props: CardProps): ReactElement => {
    const { className, children, theme = CardTheme.NORMAL, ...restProps } = props;

    return (
        <div
            {...restProps}
            className={classNames(classes.Card, {}, [className, classes[theme]])}
        >
            {children}
        </div>
    );
};
