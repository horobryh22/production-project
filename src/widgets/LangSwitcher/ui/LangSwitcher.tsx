import { ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib';
import { Button, ButtonTheme } from 'shared/ui';

interface LangSwitcherProps {
    className?: string;
    short?: boolean;
}

export const LangSwitcher = ({ className, short }: LangSwitcherProps): ReactElement => {
    const { t, i18n } = useTranslation();

    const toggleLang = async (): Promise<void> => {
        await i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
    };

    return (
        <Button
            theme={ButtonTheme.CLEAR_INVERTED}
            onClick={toggleLang}
            className={classNames('', {}, [String(className)])}
        >
            {short ? t('shortLang') : t('lang')}
        </Button>
    );
};
