import { ReactElement, memo, useState, useCallback, useMemo } from 'react';

import StarIcon from '@/shared/assets/icons/star.svg';
import { classNames } from '@/shared/lib';
import { Mods } from '@/shared/lib/classNames/classNames';

import { Icon } from '../Icon/Icon';
import { HStack } from '../Stack/HStack/HStack';

import classes from './StarRating.module.scss';

interface StarRatingProps {
    className?: string;
    onSelect?: (starCount: number) => void;
    selectedStars?: number;
    size?: number;
}

const STARS = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps): ReactElement => {
    const { className, size = 30, onSelect, selectedStars = 0 } = props;

    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));
    const [selectedStarsCount, setSelectedStarsCount] = useState(selectedStars);

    const onMouseEnter = useCallback(
        (starsCount: number) => () => {
            if (!isSelected) {
                setSelectedStarsCount(starsCount);
            }
        },
        [isSelected],
    );

    const onMouseLeave = useCallback(() => {
        if (!isSelected) {
            setSelectedStarsCount(0);
        }
    }, [isSelected]);

    const onSelectStar = useCallback(
        (starsCount: number) => () => {
            if (!isSelected) {
                onSelect?.(starsCount);
                setIsSelected(true);
                setSelectedStarsCount(starsCount);
            }
        },
        [isSelected, onSelect],
    );

    const mappedStars = useMemo(
        () =>
            STARS.map(starCount => {
                const iconMods: Mods = {
                    [classes.selected]: selectedStarsCount >= starCount,
                    [classes.cursorAuto]: isSelected,
                };

                return (
                    <Icon
                        key={starCount}
                        className={classNames(classes.normal, iconMods, [])}
                        width={size}
                        height={size}
                        Svg={StarIcon}
                        onMouseEnter={onMouseEnter(starCount)}
                        onMouseLeave={onMouseLeave}
                        onClick={onSelectStar(starCount)}
                        theme={'outline'}
                    />
                );
            }),
        [isSelected, onMouseEnter, onMouseLeave, onSelectStar, selectedStarsCount, size],
    );

    return <HStack className={classNames('', {}, [className])}>{mappedStars}</HStack>;
});
