import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./common/translation/en.json";
import es from "./common/translation/es.json";

i18n.use(initReactI18next).init({
  resources: {
    es: {
        translation: es,
      },
    en: {
      translation: en,
    },
  },
  lng: "es",
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;