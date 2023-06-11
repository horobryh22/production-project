import { CSSProperties, ReactElement, useMemo } from 'react';

import classes from './Avatar.module.scss';

import { classNames } from '@/shared/lib';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
}

export const Avatar = (props: AvatarProps): ReactElement => {
    const { src, size, className } = props;

    const styles = useMemo<CSSProperties>(() => {
        return {
            height: size || 100,
            width: size || 100,
        };
    }, [size]);

    return (
        <img
            src={src}
            style={styles}
            alt="avatar"
            className={classNames(classes.Avatar, {}, [className])}
        />
    );
};
