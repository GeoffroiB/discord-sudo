import i18n from "i18n";
i18n.configure({
    locales: ["fr", "en"],
    defaultLocale: "en",
    directory: "./locales",
    extension: ".json",
    register: global,
});

import {sudoClient} from "./sudo";
sudoClient.init();
