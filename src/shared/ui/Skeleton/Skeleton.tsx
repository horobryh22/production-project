import { CSSProperties, memo, ReactElement } from 'react';

import classes from './Skeleton.module.scss';

import { classNames } from '@/shared/lib';

interface SkeletonProps {
    className?: string;
    width?: number | string;
    height?: number | string;
    border?: number | string;
}

export const Skeleton = memo((props: SkeletonProps): ReactElement => {
    const { className, height, border, width } = props;

    const style: CSSProperties = {
        height,
        borderRadius: border,
        width,
    };

    return (
        <div
            style={style}
            className={classNames(classes.Skeleton, {}, [className])}
        ></div>
    );
});
