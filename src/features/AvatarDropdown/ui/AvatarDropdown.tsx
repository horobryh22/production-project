import React, { memo, ReactElement, useCallback, useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import classes from './AvatarDropdown.module.scss';

import { isUserAdmin, isUserManager, selectAuthData, userActions } from '@/entities/User';
import { RoutePath } from '@/shared/const/router';
import { classNames, useAppDispatch } from '@/shared/lib';
import { Avatar, Dropdown, DropdownItems } from '@/shared/ui';

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps): ReactElement => {
    const { className } = props;

    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const userData = useSelector(selectAuthData);
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);

    const isAdminPanelVisible = isAdmin || isManager;

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    const dropdownItems: DropdownItems[] = useMemo(() => {
        return [
            ...(isAdminPanelVisible
                ? [
                      {
                          href: RoutePath.admin,
                          content: t('Admin panel'),
                      },
                  ]
                : []),
            {
                href: RoutePath.profile + userData.id,
                content: t('Profile'),
            },
            {
                onClick: onLogout,
                content: t('Logout'),
            },
        ];
    }, [isAdminPanelVisible, onLogout, t, userData.id]);

    return (
        <Dropdown
            className={classNames(classes.dropdown, {}, [className])}
            items={dropdownItems}
            trigger={<Avatar size={30} src={userData.avatar} />}
            direction={'bottom left'}
        />
    );
});
