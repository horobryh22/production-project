import {Button, ThemeButton} from 'shared/ui';
import classes from './LangSwitcher.module.scss';
import {classNames} from 'shared/lib';
import {useTranslation} from 'react-i18next';


interface LangSwitcherProps {
    className?: string;
}

export const LangSwitcher = ({className}: LangSwitcherProps) => {

    const {t, i18n} = useTranslation();

    const toggleLang = async () => {
        await i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
    }

    return (
        <Button
            theme={ThemeButton.CLEAR}
            onClick={toggleLang}
            className={classNames(classes.LangSwitcher, {}, [className])}
        >
            {t('lang')}
        </Button>
    );
};