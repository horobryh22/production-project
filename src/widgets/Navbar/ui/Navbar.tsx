import React, { memo, ReactElement, useCallback, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import classes from './Navbar.module.scss';

import { RoutePath } from 'app/providers/router/config/routeConfig';
import { selectAuthData, selectIsUserAuth, userActions } from 'entities/User';
import { LoginModal } from 'features/AuthByUserName';
import { classNames, useAppDispatch } from 'shared/lib';
import {
    AppLink,
    AppLinkTheme,
    Avatar,
    Button,
    ButtonTheme,
    Dropdown,
    DropdownItems,
    Text,
    TextTheme,
} from 'shared/ui';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps): ReactElement => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const isUserAuth = useSelector(selectIsUserAuth);
    const userData = useSelector(selectAuthData);

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

    const dropdownItems: DropdownItems[] = useMemo(() => {
        return [
            {
                href: RoutePath.profile + userData.id,
                content: t('Profile'),
            },
            {
                onClick: onLogout,
                content: t('Logout'),
            },
        ];
    }, [onLogout, t, userData.id]);

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
            {isUserAuth ? (
                <Dropdown
                    className={classes.dropdown}
                    items={dropdownItems}
                    trigger={<Avatar size={30} src={userData.avatar} />}
                    direction={'bottom left'}
                />
            ) : (
                <Button
                    className={classes.btn}
                    onClick={openModal}
                    theme={ButtonTheme.CLEAR_INVERTED}
                >
                    {t('Login')}
                </Button>
            )}
        </header>
    );
});
