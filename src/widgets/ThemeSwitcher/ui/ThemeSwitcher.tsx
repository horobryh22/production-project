import { ReactElement } from 'react';

import { Theme, useTheme } from 'app/providers/ThemeProvider';
import ThemeDark from 'shared/assets/icons/theme-dark.svg';
import ThemeLight from 'shared/assets/icons/theme-light.svg';
import { classNames } from 'shared/lib';
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
            className={classNames('', {}, [String(className)])}
        >
            {theme === Theme.LIGHT ? <ThemeLight /> : <ThemeDark />}
        </Button>
    );
};
