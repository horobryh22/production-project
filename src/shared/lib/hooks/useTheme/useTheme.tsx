import { useContext } from 'react';

import { Theme } from '../../../const/enums';
import { ThemeContext } from '../../context/ThemeContext';

interface UseThemeResult {
    theme: Theme;
    toggleTheme: (saveAction: (theme: Theme) => void) => void;
}

export const useTheme = (): UseThemeResult => {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = (saveAction: (theme: Theme) => void): void => {
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

        saveAction?.(selectedTheme);
    };

    return { theme: theme || Theme.DARK, toggleTheme };
};
