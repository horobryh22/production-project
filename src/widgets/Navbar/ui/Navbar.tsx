import React, { memo, ReactElement, useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { selectAuthData, selectIsUserAuth } from '@/entities/User';
import { LoginModal } from '@/features/AuthByUserName';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import { NotificationButton } from '@/features/NotificationButton';
import { getRouteArticleCreate } from '@/shared/const/router';
import { classNames } from '@/shared/lib';
import {
    AppLink,
    AppLinkTheme,
    Button,
    ButtonTheme,
    HStack,
    Text,
    TextTheme,
} from '@/shared/ui';

import classes from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps): ReactElement => {
    const { t } = useTranslation();

    const isUserAuth = useSelector(selectIsUserAuth);
    const userData = useSelector(selectAuthData);

    const [isOpen, setIsOpen] = useState(false);

    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    const openModal = useCallback(() => {
        setIsOpen(true);
    }, []);

    return (
        <header className={classNames(classes.Navbar, {}, [className])}>
            <Text
                title="UlbiTV app"
                theme={TextTheme.INVERTED}
                className={classes.appName}
            />
            <HStack max justify={'between'}>
                {isUserAuth && (
                    <AppLink
                        className={classes.createBtn}
                        to={getRouteArticleCreate()}
                        theme={AppLinkTheme.PRIMARY}
                    >
                        {t('Create Article', { ns: 'article' })}
                    </AppLink>
                )}
                <HStack max gap={'16'} justify={'end'}>
                    <NotificationButton userId={userData.id} />
                    {isUserAuth ? (
                        <AvatarDropdown />
                    ) : (
                        <Button
                            className={classes.btn}
                            onClick={openModal}
                            theme={ButtonTheme.CLEAR_INVERTED}
                        >
                            {t('Login')}
                        </Button>
                    )}
                </HStack>
            </HStack>
            <LoginModal isOpen={isOpen} onClose={closeModal} />
        </header>
    );
});
