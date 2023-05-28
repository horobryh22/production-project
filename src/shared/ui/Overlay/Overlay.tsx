import { memo, ReactElement } from 'react';

import classes from './Overlay.module.scss';

import { classNames } from 'shared/lib';

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
