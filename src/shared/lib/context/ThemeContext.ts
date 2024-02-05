import { createContext } from 'react';

import { Theme } from '../hooks/useTheme/useTheme';

interface ThemeContextProps {
    theme?: Theme;
    setTheme?: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({});
