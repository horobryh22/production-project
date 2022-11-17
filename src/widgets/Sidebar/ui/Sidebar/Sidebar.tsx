import React, { memo, ReactElement, useCallback, useState } from 'react';

import { useSelector } from 'react-redux';

import { LangSwitcher } from '../../../LangSwitcher';
import { ThemeSwitcher } from '../../../ThemeSwitcher';
import { getSidebarItems } from '../../model/selectors/getSidebarItems/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';

import classes from './Sidebar.module.scss';

import { classNames } from 'shared/lib';
import { Button, ButtonTheme } from 'shared/ui';
import { ButtonSize } from 'shared/ui/Button/Button';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps): ReactElement => {
    const [collapsed, setCollapsed] = useState(false);

    const sidebarItems = useSelector(getSidebarItems);

    const onToggle = useCallback((): void => {
        setCollapsed(prev => !prev);
    }, []);

    const mappedItems = sidebarItems.map(item => {
        return <SidebarItem key={item.to} item={item} collapsed={collapsed} />;
    });

    return (
        <div
            data-testid="sidebar"
            className={classNames(classes.Sidebar, { [classes.collapsed]: collapsed }, [
                String(className),
            ])}
        >
            <Button
                data-testid="sidebar-toggle"
                onClick={onToggle}
                className={classes.collapsedBtn}
                theme={ButtonTheme.BACKGROUND_INVERTED}
                square
                size={ButtonSize.L}
            >
                {collapsed ? '>' : '<'}
            </Button>
            <div className={classes.items}>{mappedItems}</div>
            <div className={classes.switchers}>
                <ThemeSwitcher />
                <LangSwitcher className={classes.ml20} short={collapsed} />
            </div>
        </div>
    );
});
