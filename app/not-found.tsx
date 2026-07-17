"use client";

import Link from "next/link";
import { LanguageSwitch } from "./components/language-switch";
import { getTranslations, localizedPath } from "./i18n";
import { useLocale } from "./i18n-client";

export default function NotFound() {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const n = t.notFound;
  return (
    <main className="not-found-page">
      <div className="not-found-orbit" aria-hidden="true" />
      <a className="not-found-logo" href={localizedPath(locale)}><span className="brand-mark" aria-hidden="true" /><span>LOGOGE</span></a>
      <div className="not-found-language"><LanguageSwitch /></div>
      <section>
        <p className="eyebrow">{n.eyebrow}</p>
        <h1>{n.title1}<br /><em>{n.title2}</em><br />{n.title3}</h1>
        <p>{n.text}</p>
        <Link href={localizedPath(locale)} className="not-found-link">{t.common.home} <i className="ui-arrow" aria-hidden="true" /></Link>
      </section>
    </main>
  );
}
