import React, { memo } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { selectIsUserAuth } from '@/entities/User';
import { classNames } from '@/shared/lib';
import { AppLink, AppLinkTheme } from '@/shared/ui';

import { SidebarItemType } from '../../model/types';

import classes from './SidebarItem.module.scss';

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
    let { to, pageName, Icon, authOnly } = item;

    const { t } = useTranslation();

    const isAuth = useSelector(selectIsUserAuth);

    if (authOnly && !isAuth) {
        return null;
    }

    return (
        <div className={classNames('', { [classes.collapsed]: collapsed })}>
            <AppLink className={classes.item} theme={AppLinkTheme.PRIMARY} to={to}>
                <Icon className={classes.icon} />
                <span className={classes.link}>{t(pageName)}</span>
            </AppLink>
        </div>
    );
});
