import { ReactElement } from 'react';

import { LoginForm } from '../LoginForm/LoginForm';

import { Modal } from 'shared/ui';

interface LoginModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    testMode?: boolean;
}

export const LoginModal = (props: LoginModalProps): ReactElement => {
    const { isOpen, onClose, testMode } = props;

    return (
        <Modal testMode={testMode} isOpen={isOpen} onClose={onClose} lazy>
            <LoginForm />
        </Modal>
    );
};
