import React, { memo, ReactElement, useCallback, useState } from 'react';

import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib';
import { Button, ButtonTheme, HStack, VStack, ButtonSize } from '@/shared/ui';

import { LangSwitcher } from '../../../LangSwitcher';
import { ThemeSwitcher } from '../../../ThemeSwitcher';
import { getSidebarItems } from '../../model/selectors/getSidebarItems/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';

import classes from './Sidebar.module.scss';

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
        <aside
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
            <VStack
                role={'navigation'}
                gap={'8'}
                justify={'center'}
                className={classes.items}
            >
                {mappedItems}
            </VStack>
            <HStack justify={'center'} gap={'16'} className={classes.switchers}>
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} />
            </HStack>
        </aside>
    );
});
