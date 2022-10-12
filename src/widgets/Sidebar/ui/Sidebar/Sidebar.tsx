import React, { ReactElement, useState } from 'react';

import classes from './Sidebar.module.scss';

import { classNames } from 'shared/lib';
import { Button } from 'shared/ui';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';

interface SidebarProps {
    className?: string;
}

export const Sidebar = ({ className }: SidebarProps): ReactElement => {
    const [collapsed, setCollapsed] = useState(false);

    const onToggle = (): void => {
        setCollapsed(prev => !prev);
    };

    return (
        <div
            data-testid="sidebar"
            className={classNames(classes.Sidebar, { [classes.collapsed]: collapsed }, [
                String(className),
            ])}
        >
            <Button data-testid="sidebar-toggle" onClick={onToggle}>
                toggle
            </Button>
            <div className={classes.switchers}>
                <ThemeSwitcher />
                <LangSwitcher className={classes.ml20} />
            </div>
        </div>
    );
};
