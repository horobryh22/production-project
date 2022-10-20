import React, { ReactElement, useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';

import classes from './Navbar.module.scss';

import { LoginModal } from 'features/AuthByUserName';
import { classNames } from 'shared/lib';
import { Button, ButtonTheme } from 'shared/ui';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps): ReactElement => {
    const { t } = useTranslation();

    const [isOpen, setIsOpen] = useState(false);

    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    const openModal = useCallback(() => {
        setIsOpen(true);
    }, []);

    return (
        <div className={classNames(classes.Navbar, {}, [String(className)])}>
            <LoginModal isOpen={isOpen} onClose={closeModal} />
            <Button
                className={classes.links}
                onClick={openModal}
                theme={ButtonTheme.CLEAR_INVERTED}
            >
                {t('Login')}
            </Button>
        </div>
    );
};
