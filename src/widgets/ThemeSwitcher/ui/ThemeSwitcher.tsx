import ThemeLight from 'shared/assets/icons/theme-light.svg';
import ThemeDark from 'shared/assets/icons/theme-dark.svg';
import {Button, ThemeButton} from 'shared/ui';
import classes from './ThemeSwitcher.module.scss';
import {classNames, Theme, useTheme} from 'shared/lib';


interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = ({className}: ThemeSwitcherProps) => {

    const {theme, toggleTheme} = useTheme();

    return (
        <Button
            theme={ThemeButton.CLEAR}
            onClick={toggleTheme}
            className={classNames(classes.ThemeSwitcher, {}, [className])}
        >
            {theme === Theme.LIGHT ? <ThemeLight/> : <ThemeDark/>}
        </Button>
    );
};