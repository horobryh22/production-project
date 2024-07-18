import React, { ReactNode, useEffect, useMemo, useState } from 'react';

import { useSelector } from 'react-redux';

import { selectInitialized, useJsonSettings } from '@/entities/User';
import { Theme } from '@/shared/const/enums';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps): JSX.Element => {
    const { theme: defaultTheme = Theme.DARK } = useJsonSettings();
    const _initialized = useSelector(selectInitialized);

    const [theme, setTheme] = useState<Theme>(defaultTheme);

    useEffect(() => {
        if (_initialized) {
            setTheme(defaultTheme);
        }
    }, [_initialized, defaultTheme]);

    document.body.className = theme;

    const defaultProps = useMemo(() => {
        return { theme, setTheme };
    }, [theme]);

    return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
};
