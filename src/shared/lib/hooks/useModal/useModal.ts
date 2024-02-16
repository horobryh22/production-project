import { useCallback, useEffect, useRef, useState } from 'react';

interface UseModal {
    isOpen?: boolean;
    onClose?: () => void;
    animationDelay?: number;
}

interface UseModalResult {
    isClosing: boolean;
    closeHandler: () => void;
}

/**
 * Переиспользуемый хук для модальных компонентов (drawer/modal)
 * @param isOpen
 * @param onClose
 * @param animationDelay
 */

export const useModal = ({
    isOpen,
    onClose,
    animationDelay,
}: UseModal): UseModalResult => {
    const [isClosing, setIsClosing] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    const closeHandler = useCallback((): void => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, animationDelay);
        }
    }, [animationDelay, onClose]);

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

    return {
        isClosing,
        closeHandler,
    };
};
