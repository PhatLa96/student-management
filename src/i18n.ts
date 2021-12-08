import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-locize-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { DateTime } from 'luxon';
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init
const isProduction = process.env.NODE_ENV === 'production';

const locizeOption = {
  projectId: 'b430a32c-b42e-460b-a768-dd70b5aa7604',
  apiKey: '2a123801-3609-4478-8039-d973edee3df3', // YOU should not expose your apps API key to production!!!
  referenceLng: 'en',
  version: 'latest',
};
console.log(locizeOption.apiKey);
i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: true,
    detection: {
      order: ['queryString', 'cookie'],
      caches: ['cookie'],
    },
    backend: locizeOption as any,
    saveMissing: !isProduction,
    interpolation: {
      escapeValue: false,
      format: (value, format, lng) => {
        if (value instanceof Date) {
          return DateTime.fromJSDate(value).setLocale(lng as any);
        }
        return value;
      },
      // not needed for react as it escapes by default
    },
  });
export default i18n;
