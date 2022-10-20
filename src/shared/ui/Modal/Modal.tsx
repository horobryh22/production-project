import {
    MouseEvent,
    ReactElement,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

import { classNames } from '../../lib/classNames/classNames';
import { Portal } from '../Portal/Portal';

import classes from './Modal.module.scss';

interface ModalProps {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    testMode?: boolean;
    lazy?: boolean;
}

const ANIMATION_DELAY = 300;
const MODAL_ROOT = document.getElementById('modal-root');

export const Modal = (props: ModalProps): ReactElement => {
    const { className, children, isOpen, onClose, testMode, lazy } = props;

    const [isMounted, setIsMounted] = useState(false);

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
            setIsMounted(true);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }

        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    const mods: Record<string, boolean> = {
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

    if (lazy && !isMounted) return null;

    if (testMode) return modalElement;

    return <Portal container={MODAL_ROOT}>{modalElement}</Portal>;
};
