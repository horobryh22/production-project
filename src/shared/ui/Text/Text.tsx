import { memo, ReactElement } from 'react';

import classes from './Text.module.scss';

import { classNames } from 'shared/lib';

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error',
}

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextTheme;
}

export const Text = memo((props: TextProps): ReactElement => {
    const { text, className, title, theme } = props;

    return (
        <div className={classNames(classes.Text, {}, [className, classes[theme]])}>
            {title && <p className={classes.title}>{title}</p>}
            {text && <p className={classes.text}>{text}</p>}
        </div>
    );
});
