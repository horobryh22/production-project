import React, { memo, ReactElement, useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import classes from './Navbar.module.scss';

import { RoutePath } from 'app/providers/router/config/routeConfig';
import { selectIsUserAuth, userActions } from 'entities/User';
import { LoginModal } from 'features/AuthByUserName';
import { classNames, useAppDispatch } from 'shared/lib';
import { AppLink, AppLinkTheme, Button, ButtonTheme, Text, TextTheme } from 'shared/ui';

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
        <header className={classNames(classes.Navbar, {}, [String(className)])}>
            <Text
                title="UlbiTV app"
                theme={TextTheme.INVERTED}
                className={classes.appName}
            />
            {isUserAuth && (
                <AppLink to={RoutePath.article_create} theme={AppLinkTheme.PRIMARY}>
                    {t('Create Article', { ns: 'article' })}
                </AppLink>
            )}
            <LoginModal isOpen={isOpen} onClose={closeModal} />
            <Button
                className={classes.links}
                onClick={isUserAuth ? onLogout : openModal}
                theme={ButtonTheme.CLEAR_INVERTED}
            >
                {isUserAuth ? t('Logout') : t('Login')}
            </Button>
        </header>
    );
});
