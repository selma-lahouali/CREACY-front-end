// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './en/translations.json';
import frTranslation from './fr/translations.json';
const savedLanguage = localStorage.getItem('language') || 'en';
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      fr: {
        translation: frTranslation
      }
    },
    lng: savedLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // React already does escaping
    }
  });

export default i18n;
