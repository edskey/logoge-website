"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { LanguageSwitch } from "../components/language-switch";
import { getTranslations, localizedPath } from "../i18n";
import { useLocale } from "../i18n-client";

const whatsappBase = "https://wa.me/995550001182";

function ContactsContent() {
  const params = useSearchParams();
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const c = t.contacts;
  const home = localizedPath(locale);
  const packageParam = params.get("package") ?? "";
  const serviceParam = params.get("service") ?? "";
  const selectedPackage = ["Start", "Business", "Premium", "Pro", "Mentorship", "Essential", "Story", "Full Event", "Landing", "Custom"].includes(packageParam) ? packageParam : null;
  const selectedService = ["SMM", "Academy", "Event Reels", "Web Development"].includes(serviceParam) ? serviceParam : null;
  const selection = selectedPackage && selectedService ? `${selectedService} — ${selectedPackage}` : selectedPackage;
  const backHref = selectedService === "Academy" ? `${home}#academy` : selectedService === "Event Reels" ? `${home}#event-reels` : selectedService === "Web Development" ? `${home}#web` : `${home}#smm`;
  const whatsapp = selection
    ? `${whatsappBase}?text=${encodeURIComponent(`${c.whatsappPackage} ${selection}.`)}`
    : `${whatsappBase}?text=${encodeURIComponent(c.whatsappProject)}`;

  return (
    <main className="contacts-page">
      <header className="smm-detail-header contacts-page-header">
        <a className="smm-detail-logo" href={home}><span className="brand-mark" aria-hidden="true" /><span>LOGOGE</span></a>
        <nav className="smm-detail-nav" aria-label={c.navLabel}>
          <a href={`${home}#branding`}>{t.common.services.branding}</a>
          <a href={`${home}#smm`}>SMM</a>
          <a href={`${home}#academy`}>{t.common.services.academy}</a>
          <a href={`${home}#event-reels`}>Event Reels</a>
          <a href={`${home}#web`}>Web</a>
          <a href={localizedPath(locale, "/we")}>{t.common.nav.we}</a>
        </nav>
        <div className="detail-header-actions"><LanguageSwitch /><a className="smm-back" href={backHref}><i className="ui-arrow ui-arrow-back" aria-hidden="true" /> {t.common.back}</a></div>
      </header>

      <section className="contacts-page-content">
        <div>
          <p className="eyebrow">{c.eyebrow}</p>
          <h1>{c.title}<br /><em>{c.titleAccent}</em></h1>
          {selection && <p className="selected-package">{c.selected} <strong>{selection}</strong></p>}
        </div>
        <div className="contacts-page-actions">
          <a className="contacts-primary" href={whatsapp} target="_blank" rel="noreferrer">{c.whatsapp} <span className="ui-arrow" aria-hidden="true" /></a>
          <a href="tel:+995550001182">+995 550 00 11 82</a>
          <a href="mailto:info.logoge@gmail.com">info.logoge@gmail.com</a>
          <p>Vazisubani 2/10 · Tbilisi</p>
          <div className="contacts-socials">
            <a href="https://www.instagram.com/logoge.marketing" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://www.facebook.com/share/1EWu7wu7zo/" target="_blank" rel="noreferrer">Facebook</a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ContactsPage() { return <Suspense><ContactsContent /></Suspense>; }
