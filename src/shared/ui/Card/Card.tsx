import { HTMLAttributes, ReactElement, ReactNode } from 'react';

import classes from './Card.module.scss';

import { classNames } from 'shared/lib';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
}

export const Card = (props: CardProps): ReactElement => {
    const { className, children, ...restProps } = props;

    return (
        <div {...restProps} className={classNames(classes.Card, {}, [className])}>
            {children}
        </div>
    );
};
