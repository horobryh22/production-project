import { memo, ReactElement, useCallback } from 'react';

import { saveJsonSettings } from '@/entities/User';
import ThemeDark from '@/shared/assets/icons/theme-dark.svg';
import ThemeLight from '@/shared/assets/icons/theme-light.svg';
import { Theme } from '@/shared/const/enums';
import { classNames, useAppDispatch } from '@/shared/lib';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Button, ButtonTheme } from '@/shared/ui';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps): ReactElement => {
    const { theme, toggleTheme } = useTheme();
    const dispatch = useAppDispatch();

    const onToggleTheme = useCallback(() => {
        toggleTheme(theme => {
            dispatch(
                saveJsonSettings({
                    theme,
                }),
            );
        });
    }, [dispatch, toggleTheme]);

    return (
        <Button
            theme={ButtonTheme.CLEAR}
            onClick={onToggleTheme}
            className={classNames('', {}, [className])}
        >
            {theme === Theme.LIGHT ? <ThemeLight /> : <ThemeDark />}
        </Button>
    );
});
