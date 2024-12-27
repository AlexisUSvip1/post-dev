import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import es from './locales/es.json';

i18n
  .use(LanguageDetector) // Detecta automáticamente el idioma del navegador
  .use(initReactI18next) // Configura React con i18n
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    fallbackLng: 'es', // Idioma predeterminado si el idioma no está disponible
    debug: true, // Para ver más información en la consola
    interpolation: {
      escapeValue: false, // React ya maneja el escape
    },
  });

export default i18n;