import { useContext } from 'react';

import { LOCAL_STORAGE_THEME_KEY } from '../../../const/localStorage';
import { ThemeContext } from '../../context/ThemeContext';

export enum Theme {
    DARK = 'app_dark_theme',
    LIGHT = 'app_light_theme',
    PURPLE = 'app_purple_theme',
}

interface UseThemeResult {
    theme: Theme;
    toggleTheme: () => void;
}

export const useTheme = (): UseThemeResult => {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = (): void => {
        let selectedTheme: Theme;

        switch (theme) {
            case Theme.DARK:
                selectedTheme = Theme.LIGHT;
                break;
            case Theme.LIGHT:
                selectedTheme = Theme.PURPLE;
                break;
            case Theme.PURPLE:
                selectedTheme = Theme.DARK;
                break;
            default:
                selectedTheme = Theme.DARK;
        }

        setTheme?.(selectedTheme);
        document.body.className = selectedTheme;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, selectedTheme);
    };

    return { theme: theme || Theme.DARK, toggleTheme };
};
