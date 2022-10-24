import React, { memo, ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

import { SidebarItemType } from '../../model/items';

import classes from './SidebarItem.module.scss';

import { classNames } from 'shared/lib';
import { AppLink, AppLinkTheme } from 'shared/ui';

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps): ReactElement => {
    const { to, pageName, Icon } = item;

    const { t } = useTranslation();

    return (
        <div className={classNames('', { [classes.collapsed]: collapsed })}>
            <AppLink className={classes.item} theme={AppLinkTheme.PRIMARY} to={to}>
                <Icon className={classes.icon} />
                <span className={classes.link}>{t(pageName)}</span>
            </AppLink>
        </div>
    );
});
