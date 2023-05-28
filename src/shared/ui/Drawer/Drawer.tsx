import { memo, ReactNode } from 'react';

import { useModal } from '../../lib/hooks/useModal/useModal';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';

import classes from './Drawer.module.scss';

import { classNames } from 'shared/lib';
import { Mods } from 'shared/lib/classNames/classNames';

export interface DrawerProps {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    testMode?: boolean;
}

const DRAWER_ROOT = document.getElementById('drawer-root') || undefined;
const ANIMATION_DELAY = 300;

export const Drawer = memo((props: DrawerProps) => {
    const { className, children, isOpen, onClose, testMode } = props;

    const { isClosing, closeHandler } = useModal({
        animationDelay: ANIMATION_DELAY,
        isOpen: isOpen,
        onClose,
    });

    const mods: Mods = {
        [classes.opened]: isOpen,
        [classes.isClosing]: isClosing,
    };

    const drawerElement = (
        <div className={classNames(classes.Drawer, mods, [className])}>
            <Overlay onClick={closeHandler} />
            <div className={classes.content}>{children}</div>
        </div>
    );

    if (!isOpen) return null;

    if (testMode) return drawerElement;

    return <Portal container={DRAWER_ROOT}>{drawerElement}</Portal>;
});
