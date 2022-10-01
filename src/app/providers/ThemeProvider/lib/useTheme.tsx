import React, {useContext} from 'react';
import {
    LOCAL_STORAGE_THEME_KEY,
    Theme,
    ThemeContext
} from './ThemeContext';

interface UseThemeResult {
    theme: Theme;
    toggleTheme: () => void;
}

export const useTheme = (): UseThemeResult => {

    const {theme, setTheme} = useContext(ThemeContext);

    const toggleTheme = () => {
        const selectedTheme = Theme.DARK === theme ? Theme.LIGHT : Theme.DARK;
        setTheme(selectedTheme);
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, selectedTheme);
    }

    return {theme, toggleTheme};
};