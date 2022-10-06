import { ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

import classes from './LangSwitcher.module.scss';

import { classNames } from 'shared/lib';
import { Button, ThemeButton } from 'shared/ui';

interface LangSwitcherProps {
    className?: string;
}

export const LangSwitcher = ({ className }: LangSwitcherProps): ReactElement => {
    const { t, i18n } = useTranslation();

    const toggleLang = async (): Promise<void> => {
        await i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
    };

    return (
        <Button
            theme={ThemeButton.CLEAR}
            onClick={toggleLang}
            className={classNames(classes.LangSwitcher, {}, [String(className)])}
        >
            {t('lang')}
        </Button>
    );
};
