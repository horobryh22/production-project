import { useContext } from 'react';

import { LOCAL_STORAGE_THEME_KEY, ThemeContext } from './ThemeContext';

export enum Theme {
    DARK = 'app_dark_theme',
    LIGHT = 'app_light_theme',
}

interface UseThemeResult {
    theme: Theme;
    toggleTheme: () => void;
}

export const useTheme = (): UseThemeResult => {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = (): void => {
        const selectedTheme = Theme.DARK === theme ? Theme.LIGHT : Theme.DARK;

        setTheme?.(selectedTheme);
        document.body.className = selectedTheme;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, selectedTheme);
    };

    return { theme: theme || Theme.DARK, toggleTheme };
};
