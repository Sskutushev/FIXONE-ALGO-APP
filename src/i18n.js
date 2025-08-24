import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi) // Load translations using http
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    supportedLngs: ['ru', 'en', 'de', 'es', 'fr', 'zh'],
    fallbackLng: 'ru', // use Russian if detected lng is not available
    debug: true, // Set to false in production

    interpolation: {
      escapeValue: false, // React already safes from xss
    },

    backend: {
      loadPath: '/FIXONE-ALGO-APP/locales/{{lng}}/translation.json', // Path to translation files
    },
  });

export default i18n;
