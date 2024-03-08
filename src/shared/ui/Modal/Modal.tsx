import { ReactNode } from 'react';

import { classNames, Mods } from '../../lib/classNames/classNames';
import { useModal } from '../../lib/hooks/useModal/useModal';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';

import classes from './Modal.module.scss';

interface ModalProps {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    testMode?: boolean;
}

const ANIMATION_DELAY = 300;
const MODAL_ROOT = document.getElementById('modal-root') || undefined;

export const Modal = (props: ModalProps) => {
    const { className, children, isOpen, onClose, testMode, ...restProps } = props;

    const { isClosing, closeHandler } = useModal({
        animationDelay: ANIMATION_DELAY,
        isOpen: isOpen,
        onClose,
    });

    const mods: Mods = {
        [classes.opened]: isOpen,
        [classes.isClosing]: isClosing,
    };

    const modalElement = (
        <div {...restProps} className={classNames(classes.Modal, mods, [className])}>
            <Overlay onClick={closeHandler} />
            <div className={classes.content}>{children}</div>
        </div>
    );

    if (!isOpen) return null;

    if (testMode) return modalElement;

    return <Portal container={MODAL_ROOT}>{modalElement}</Portal>;
};
