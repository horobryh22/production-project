import React, { ReactElement, useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import classes from './Navbar.module.scss';

import { useAppDispatch } from 'app/providers/StoreProvider/config/store';
import { selectIsUserAuth, userActions } from 'entities/User';
import { LoginModal } from 'features/AuthByUserName';
import { classNames } from 'shared/lib';
import { Button, ButtonTheme } from 'shared/ui';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps): ReactElement => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const isUserAuth = useSelector(selectIsUserAuth);

    const [isOpen, setIsOpen] = useState(false);

    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    const openModal = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onLogout = useCallback((): void => {
        dispatch(userActions.logout());
    }, [dispatch]);

    return (
        <div className={classNames(classes.Navbar, {}, [String(className)])}>
            {!isUserAuth && <LoginModal isOpen={isOpen} onClose={closeModal} />}
            <Button
                className={classes.links}
                onClick={isUserAuth ? onLogout : openModal}
                theme={ButtonTheme.CLEAR_INVERTED}
            >
                {isUserAuth ? t('Logout') : t('Login')}
            </Button>
        </div>
    );
};
