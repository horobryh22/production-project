import React, { ReactElement, useState } from 'react';

import { useTranslation } from 'react-i18next';

import classes from './Sidebar.module.scss';

import { RoutePath } from 'app/providers/router/config/routeConfig';
import AboutIcon from 'shared/assets/icons/about.svg';
import MainIcon from 'shared/assets/icons/main.svg';
import { classNames } from 'shared/lib';
import { AppLink, AppLinkTheme, Button, ButtonTheme } from 'shared/ui';
import { ButtonSize } from 'shared/ui/Button/Button';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';

interface SidebarProps {
    className?: string;
}

export const Sidebar = ({ className }: SidebarProps): ReactElement => {
    const [collapsed, setCollapsed] = useState(false);

    const { t } = useTranslation();

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
            <div className={classes.items}>
                <AppLink
                    className={classes.item}
                    theme={AppLinkTheme.PRIMARY}
                    to={RoutePath.main}
                >
                    <MainIcon className={classes.icon} />
                    <span className={classes.link}>{t('Main')}</span>
                </AppLink>
                <AppLink
                    theme={AppLinkTheme.PRIMARY}
                    to={RoutePath.about}
                    className={classes.item}
                >
                    <AboutIcon className={classes.icon} />
                    <span className={classes.link}> {t('About')}</span>
                </AppLink>
            </div>
            <div className={classes.switchers}>
                <ThemeSwitcher />
                <LangSwitcher className={classes.ml20} short={collapsed} />
            </div>
        </div>
    );
};
