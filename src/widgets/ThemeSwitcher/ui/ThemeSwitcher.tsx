import {Theme, useTheme} from 'app/providers/ThemeProvider';
import ThemeLight from 'shared/assets/icons/theme-light.svg';
import ThemeDark from 'shared/assets/icons/theme-dark.svg';
import {Button, ThemeButton} from 'shared/ui';
import {classNames} from 'shared';
import classes from './ThemeSwitcher.module.scss';


interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = ({className}: ThemeSwitcherProps) => {

    const {theme, toggleTheme} = useTheme();

    return (
        <Button
            theme={ThemeButton.CLEAR}
            onClick={toggleTheme}
            className={classNames(classes.ThemeSwitcher, {}, [classes[className]])}
        >
            {theme === Theme.LIGHT ? <ThemeLight/> : <ThemeDark/>}
        </Button>
    );
};