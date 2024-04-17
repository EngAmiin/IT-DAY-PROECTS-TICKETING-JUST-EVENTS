import i18n from "i18next";  
import { initReactI18next } from "react-i18next";
import { lang } from "./en";
import { ar_lang } from "./ar";
i18n
  // Add React bindings as a plugin.
  .use(initReactI18next)
  // Initialize the i18next instance.
  .init({
    // Config options             
    lng: "en",

    // Fallback locale used when a translation is
    fallbackLng: "en",

    // Enables useful output in the browser’s
    // dev console.
    debug: true,

    // Normally, we want `escapeValue: true` as it
    interpolation: {
      escapeValue: false,
    },

    // Translation messages. Add any languages
    // you want here.
    resources: {
      // English
      en: {
        // `translation` is the default namespace.
        // More details about namespaces shortly.
        translation:lang
      },
      // Arabic
      ar: {
        translation: ar_lang
      },
    },
  });

export default i18n;