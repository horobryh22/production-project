import { CSSProperties, ReactElement, useMemo } from 'react';

import AvatarIcon from '@/shared/assets/icons/avatar.svg';
import { classNames } from '@/shared/lib';

import { AppImage } from '../AppImage/AppImage';
import { Icon } from '../Icon/Icon';
import { Skeleton } from '../Skeleton/Skeleton';

import classes from './Avatar.module.scss';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    invertedFallback?: boolean;
}

export const Avatar = (props: AvatarProps): ReactElement => {
    const { src, size = 100, className, invertedFallback } = props;

    const styles = useMemo<CSSProperties>(() => {
        return {
            height: size,
            width: size,
        };
    }, [size]);

    return (
        <AppImage
            src={src}
            style={styles}
            alt="avatar"
            className={classNames(classes.Avatar, {}, [className])}
            fallback={<Skeleton width={size} height={size} border={'100%'} />}
            errorFallback={
                <Icon
                    width={size}
                    height={size}
                    Svg={AvatarIcon}
                    {...(invertedFallback ? { theme: 'inverted' } : {})}
                />
            }
        />
    );
};
