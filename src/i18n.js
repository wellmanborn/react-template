import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import {initReactI18next} from "react-i18next";

i18next
    .use(Backend)
    .use(initReactI18next)
    .init({
        lng: "fa",
        // disable in production
        debug: false,
        backend: {
            loadPath: '/assets/i18n/{{lng}}.json'
        },
        fallbackLng: "en",
        // you can
        //ns: ["common", "home", "profile"],
        interpolation: {
            escapeValue: false, // react already safes from xss
            formatSeparator: ','
        },
        react: {
            wait: true
        }
    });
export default i18next;