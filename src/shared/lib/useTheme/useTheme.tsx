import { useContext } from 'react';

import { LOCAL_STORAGE_THEME_KEY, ThemeContext } from 'app/providers/ThemeProvider';

export enum Theme {
    DARK = 'dark',
    LIGHT = 'light',
}

interface UseThemeResult {
    theme: Theme;
    toggleTheme: () => void;
}

export const useTheme = (): UseThemeResult => {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = (): void => {
        const selectedTheme = Theme.DARK === theme ? Theme.LIGHT : Theme.DARK;

        if (setTheme) {
            setTheme(selectedTheme);
        }
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, selectedTheme);
    };

    return { theme: theme!, toggleTheme };
};
