import { HTMLAttributes, memo, ReactElement, ReactNode, DetailedHTMLProps } from 'react';

import { classNames } from '@/shared/lib';
import { Mods } from '@/shared/lib/classNames/classNames';

import classes from './Flex.module.scss';

type FlexJustify = 'center' | 'between' | 'start' | 'end';
type FlexAlign = 'center' | 'start' | 'end';
type FlexDirection = 'row' | 'column';
type FlexGap = '4' | '8' | '16' | '32';

const justifyClass: Record<FlexJustify, string> = {
    center: classes.justifyCenter,
    between: classes.justifyBetween,
    start: classes.justifyStart,
    end: classes.justifyEnd,
};

const alignClass: Record<FlexAlign, string> = {
    center: classes.alignCenter,
    start: classes.alignStart,
    end: classes.alignEnd,
};

const directionClass: Record<FlexDirection, string> = {
    row: classes.directionRow,
    column: classes.directionColumn,
};

const gapClass: Record<FlexGap, string> = {
    4: classes.gap4,
    8: classes.gap8,
    16: classes.gap16,
    32: classes.gap32,
};

type DivPropsType = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface FlexProps extends DivPropsType {
    children?: ReactNode;
    className?: string;
    justify?: FlexJustify;
    align?: FlexAlign;
    direction?: FlexDirection;
    gap?: FlexGap;
    max?: boolean;
}

export const Flex = memo((props: FlexProps): ReactElement => {
    const {
        children,
        className,
        gap,
        justify = 'start',
        direction = 'row',
        align = 'center',
        max = false,
        ...restProps
    } = props;

    const additionalClasses = [
        className,
        justifyClass[justify],
        alignClass[align],
        directionClass[direction],
        gap && gapClass[gap],
    ];

    const mods: Mods = {
        [classes.max]: max,
    };

    return (
        <div className={classNames(classes.Flex, mods, additionalClasses)} {...restProps}>
            {children}
        </div>
    );
});
