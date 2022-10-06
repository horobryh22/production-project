import { ReactElement } from 'react';

import classes from './ThemeSwitcher.module.scss';

import ThemeDark from 'shared/assets/icons/theme-dark.svg';
import ThemeLight from 'shared/assets/icons/theme-light.svg';
import { classNames, Theme, useTheme } from 'shared/lib';
import { Button, ThemeButton } from 'shared/ui';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps): ReactElement => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            theme={ThemeButton.CLEAR}
            onClick={toggleTheme}
            className={classNames(classes.ThemeSwitcher, {}, [String(className)])}
        >
            {theme === Theme.LIGHT ? <ThemeLight /> : <ThemeDark />}
        </Button>
    );
};
