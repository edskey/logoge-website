"use client";

import { FormEvent, useState } from "react";
import { LanguageSwitch } from "../../components/language-switch";
import { getTranslations, localizedPath } from "../../i18n";
import { useLocale } from "../../i18n-client";

const whatsappBase = "https://wa.me/995550001182";

export default function AcademyApplyPage() {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const a = t.academyApply;
  const home = localizedPath(locale);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);

  const submitApplication = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = [
      a.whatsapp,
      `${a.whatsappName}: ${name.trim()}`,
      `${a.whatsappPhone}: ${phone.trim()}`,
    ].join("\n");
    window.open(`${whatsappBase}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="academy-apply-page">
      <header className="smm-detail-header academy-apply-header">
        <a className="smm-detail-logo" href={home}><span className="brand-mark" aria-hidden="true" /><span>LOGOGE</span></a>
        <nav className="smm-detail-nav" aria-label={t.contacts.navLabel}>
          <a href={`${home}#branding`}>{t.common.services.branding}</a>
          <a href={`${home}#smm`}>SMM</a>
          <a href={`${home}#academy`}>{t.common.services.academy}</a>
          <a href={`${home}#event-reels`}>Event Reels</a>
          <a href={`${home}#web`}>Web</a>
          <a href={localizedPath(locale, "/we")}>{t.common.nav.we}</a>
        </nav>
        <div className="detail-header-actions"><LanguageSwitch /><a className="smm-back" href={`${home}#academy`}><i className="ui-arrow ui-arrow-back" aria-hidden="true" /> {t.common.back}</a></div>
      </header>

      <section className="academy-apply-content">
        <div className="academy-apply-copy">
          <p className="eyebrow">{a.eyebrow}</p>
          <h1>{a.title}<br /><em>{a.titleAccent}</em></h1>
          <p className="academy-apply-lead">{a.lead}</p>
          <div className="academy-apply-meta"><span>LOGOGE Academy</span><span>{a.meta}</span></div>
        </div>

        <form className="academy-apply-form" onSubmit={submitApplication}>
          <div className="academy-form-heading">
            <span>{a.formTitle}</span>
            <b>{a.formTime}</b>
          </div>
          <label>
            <span><small>01</small> {a.name}</span>
            <input type="text" name="name" autoComplete="name" placeholder={a.namePlaceholder} value={name} onChange={(event) => setName(event.target.value)} required />
          </label>
          <label>
            <span><small>02</small> {a.phone}</span>
            <input type="tel" name="phone" autoComplete="tel" inputMode="tel" placeholder="+995 5XX XX XX XX" value={phone} onChange={(event) => setPhone(event.target.value)} required />
          </label>
          <label className="form-consent">
            <input type="checkbox" name="privacy-consent" checked={consent} onChange={(event) => setConsent(event.target.checked)} required />
            <span>{a.consent} <a href={localizedPath(locale, "/privacy")} target="_blank" rel="noreferrer">{a.consentLink}</a>{a.consentAfter}</span>
          </label>
          <button type="submit"><span>{a.submit}</span><b><i className="ui-arrow" aria-hidden="true" /></b></button>
          <p>{a.after}</p>
        </form>
      </section>
    </main>
  );
}
