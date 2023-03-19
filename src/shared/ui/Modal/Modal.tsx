import { MouseEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { classNames, Mods } from '../../lib/classNames/classNames';

import classes from './Modal.module.scss';

import { Portal } from 'shared/ui';

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
    const { className, children, isOpen, onClose, testMode } = props;

    const [isClosing, setIsClosing] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    const closeHandler = useCallback((): void => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    const onContentClick = (e: MouseEvent): void => {
        e.stopPropagation();
    };

    const onKeyDown = useCallback(
        (e: KeyboardEvent): void => {
            if (e.key === 'Escape') {
                closeHandler();
            }
        },
        [closeHandler],
    );

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }

        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    const mods: Mods = {
        [classes.opened]: isOpen,
        [classes.isClosing]: isClosing,
    };

    const modalElement = (
        <div className={classNames(classes.Modal, mods, [className])}>
            <div className={classes.overlay} onClick={closeHandler}>
                <div className={classes.content} onClick={onContentClick}>
                    {children}
                </div>
            </div>
        </div>
    );

    if (!isOpen) return null;

    if (testMode) return modalElement;

    return <Portal container={MODAL_ROOT}>{modalElement}</Portal>;
};
