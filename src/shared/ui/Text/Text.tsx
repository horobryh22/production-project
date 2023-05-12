import { memo, ReactElement } from 'react';

import classes from './Text.module.scss';

import { classNames } from 'shared/lib';

export enum TextTheme {
    PRIMARY = 'primary',
    INVERTED = 'inverted',
    ERROR = 'error',
}

export enum TextSize {
    S = 'size_s',
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
    'data-testid'?: string;
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    [TextSize.S]: 'h3',
    [TextSize.M]: 'h2',
    [TextSize.L]: 'h1',
};

export const Text = memo((props: TextProps): ReactElement => {
    const {
        text,
        className,
        title,
        size = TextSize.M,
        theme = TextTheme.PRIMARY,
        align = TextAlign.LEFT,
        'data-testid': dataTestId = 'Text',
    } = props;

    const HeaderTag = mapSizeToHeaderTag[size];

    return (
        <div
            className={classNames(classes.Text, {}, [
                className,
                classes[theme],
                classes[align],
                classes[size],
            ])}
        >
            {title && (
                <HeaderTag data-testid={`${dataTestId}.Header`} className={classes.title}>
                    {title}
                </HeaderTag>
            )}
            {text && (
                <p data-testid={`${dataTestId}.Paragraph`} className={classes.text}>
                    {text}
                </p>
            )}
        </div>
    );
});
