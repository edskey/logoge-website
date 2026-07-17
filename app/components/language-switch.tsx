"use client";

import { languageNames, locales } from "../i18n";
import { useLocale } from "../i18n-client";

export function LanguageSwitch() {
  const { locale, changeLocale } = useLocale();

  return (
    <div className="language-switch" aria-label={locale === "ka" ? "საიტის ენა" : locale === "ru" ? "Язык сайта" : "Website language"}>
      {locales.map((item) => (
        <button className={locale === item ? "is-active" : ""} type="button" onClick={() => changeLocale(item)} aria-current={locale === item ? "page" : undefined} key={item}>
          {languageNames[item]}
        </button>
      ))}
    </div>
  );
}
