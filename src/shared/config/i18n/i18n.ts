import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

// TODO доработать переводы в сторибук и в самом проекте (сейчас это не работает)

i18n
    // to divide into some chunks our file translation.json
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'ru',
        lng: 'ru',
        debug: __IS_DEV__,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
