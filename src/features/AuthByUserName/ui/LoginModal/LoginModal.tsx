import { ReactElement, Suspense } from 'react';

import { LoginFormAsync } from '../LoginForm/LoginForm.async';

import { Loader, Modal } from '@/shared/ui';

interface LoginModalProps {
    isOpen?: boolean;
    onClose: () => void;
    testMode?: boolean;
}

export const LoginModal = (props: LoginModalProps): ReactElement => {
    const { isOpen, onClose, testMode } = props;

    return (
        <Modal testMode={testMode} isOpen={isOpen} onClose={onClose}>
            <Suspense fallback={<Loader />}>
                <LoginFormAsync onSuccess={onClose} />
            </Suspense>
        </Modal>
    );
};
