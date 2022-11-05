import { memo, ReactElement } from 'react';

import classes from './Text.module.scss';

import { classNames } from 'shared/lib';

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error',
}

export enum TextSize {
    M = 'size_m',
    L = 'size_l',
}

export enum TextAlign {
    CENTER = 'center',
    LEFT = 'left',
    RIGHT = 'right',
}

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    size?: TextSize;
    theme?: TextTheme;
    align?: TextAlign;
}

export const Text = memo((props: TextProps): ReactElement => {
    const {
        text,
        className,
        title,
        size = TextSize.M,
        theme = TextTheme.PRIMARY,
        align = TextAlign.LEFT,
    } = props;

    return (
        <div
            className={classNames(classes.Text, {}, [
                className,
                classes[theme],
                classes[align],
                classes[size],
            ])}
        >
            {title && <p className={classes.title}>{title}</p>}
            {text && <p className={classes.text}>{text}</p>}
        </div>
    );
});
