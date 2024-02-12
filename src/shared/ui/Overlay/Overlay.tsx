import { memo, ReactElement } from 'react';

import { classNames } from '@/shared/lib';

import classes from './Overlay.module.scss';

interface OverlayProps {
    className?: string;
    onClick?: () => void;
}

export const Overlay = memo((props: OverlayProps): ReactElement => {
    const { className, onClick } = props;

    return (
        <div className={classNames(classes.Overlay, {}, [className])} onClick={onClick} />
    );
});
