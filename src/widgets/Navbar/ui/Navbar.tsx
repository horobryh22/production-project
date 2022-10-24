import React, { memo, ReactElement, useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import classes from './Navbar.module.scss';

import { selectIsUserAuth, userActions } from 'entities/User';
import { LoginModal } from 'features/AuthByUserName';
import { classNames, useAppDispatch } from 'shared/lib';
import { Button, ButtonTheme } from 'shared/ui';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps): ReactElement => {
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

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    return (
        <div className={classNames(classes.Navbar, {}, [String(className)])}>
            <LoginModal isOpen={isOpen} onClose={closeModal} />
            <Button
                className={classes.links}
                onClick={isUserAuth ? onLogout : openModal}
                theme={ButtonTheme.CLEAR_INVERTED}
            >
                {isUserAuth ? t('Logout') : t('Login')}
            </Button>
        </div>
    );
});
