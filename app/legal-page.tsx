"use client";

import { LanguageSwitch } from "./components/language-switch";
import { getTranslations, localizedPath } from "./i18n";
import { useLocale } from "./i18n-client";

export function LegalPage({ kind }: { kind: "privacy" | "cookies" | "terms" }) {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const content = t.legal[kind];
  const home = localizedPath(locale);

  return (
    <main className="legal-page">
      <header className="legal-header">
        <a className="smm-detail-logo" href={home}><span className="brand-mark" aria-hidden="true" /><span>LOGOGE</span></a>
        <div className="detail-header-actions"><LanguageSwitch /><a className="smm-back" href={home}><i className="ui-arrow ui-arrow-back" aria-hidden="true" /> {t.common.home}</a></div>
      </header>
      <article className="legal-content">
        <p className="eyebrow">Legal · {kind === "privacy" ? "Privacy" : kind === "cookies" ? "Cookies" : "Terms"}</p>
        <h1>{content.title}</h1>
        <p className="legal-updated">{t.legal.updated}</p>
        <div className="legal-copy">
          <p className="legal-intro">{content.intro}</p>
          <div className="legal-sections legal-plain">
            {content.sections.map(([title, text], index) => (
              <section key={title}>
                <h2>{title}</h2>
                <p>{text}{index === 3 && <> <a href="mailto:info.logoge@gmail.com">info.logoge@gmail.com</a>{kind === "privacy" && <> · <a href="tel:+995550001182">+995 550 00 11 82</a></>}</>}</p>
              </section>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
