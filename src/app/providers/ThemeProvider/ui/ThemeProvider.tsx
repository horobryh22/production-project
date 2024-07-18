import React, { ReactNode, useMemo, useState } from 'react';

import { useJsonSettings } from '@/entities/User';
import { Theme } from '@/shared/const/enums';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps): JSX.Element => {
    const { theme: defaultTheme = Theme.DARK } = useJsonSettings();
    const [theme, setTheme] = useState<Theme>(defaultTheme);

    document.body.className = theme;

    const defaultProps = useMemo(() => {
        return { theme, setTheme };
    }, [theme]);

    return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
};
