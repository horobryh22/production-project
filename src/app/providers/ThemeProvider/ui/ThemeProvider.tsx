import React, { ReactNode, useMemo, useState } from 'react';

import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { Theme } from '@/shared/lib/hooks/useTheme/useTheme';

interface ThemeProviderProps {
    children: ReactNode;
}

const defaultTheme =
    (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.DARK;

export const ThemeProvider = ({ children }: ThemeProviderProps): JSX.Element => {
    const [theme, setTheme] = useState<Theme>(defaultTheme);

    document.body.className = theme;

    const defaultProps = useMemo(() => {
        return { theme, setTheme };
    }, [theme]);

    return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
};
