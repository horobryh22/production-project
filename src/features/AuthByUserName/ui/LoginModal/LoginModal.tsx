import { lazy, ReactElement } from 'react';

import { LazyLoader, Loader, Modal } from '@/shared/ui';

// lazy
const LoginForm = lazy(() => import('../LoginForm/LoginForm'));

interface LoginModalProps {
    isOpen?: boolean;
    onClose: () => void;
    testMode?: boolean;
}

export const LoginModal = (props: LoginModalProps): ReactElement => {
    const { isOpen, onClose, testMode } = props;

    return (
        <Modal testMode={testMode} isOpen={isOpen} onClose={onClose}>
            <LazyLoader fallback={<Loader />}>
                <LoginForm onSuccess={onClose} />
            </LazyLoader>
        </Modal>
    );
};
