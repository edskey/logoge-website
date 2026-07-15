import type { Metadata } from "next";

const whatsappBase = "https://wa.me/995550001182";

export const metadata: Metadata = {
  title: "Контакты | LOGOGE",
  description: "Свяжитесь с LOGOGE, чтобы обсудить брендинг, SMM, обучение, Event Reels или сайт.",
  alternates: { canonical: "/contacts" },
};

export default async function ContactsPage({ searchParams }: { searchParams: Promise<{ package?: string; service?: string }> }) {
  const params = await searchParams;
  const selectedPackage = ["Start", "Business", "Premium", "Pro", "Mentorship", "Essential", "Story", "Full Event", "Landing", "Custom"].includes(params.package ?? "") ? params.package : null;
  const selectedService = ["SMM", "Academy", "Event Reels", "Web Development"].includes(params.service ?? "") ? params.service : null;
  const selection = selectedPackage && selectedService ? `${selectedService} — ${selectedPackage}` : selectedPackage;
  const backHref = selectedService === "Academy" ? "/#academy" : selectedService === "Event Reels" ? "/#event-reels" : selectedService === "Web Development" ? "/#web" : "/#smm";
  const whatsapp = selection
    ? `${whatsappBase}?text=${encodeURIComponent(`Здравствуйте! Хочу обсудить пакет ${selection}.`)}`
    : `${whatsappBase}?text=${encodeURIComponent("Здравствуйте! Хочу обсудить проект с LOGOGE.")}`;

  return (
    <main className="contacts-page">
      <header className="smm-detail-header contacts-page-header">
        <a className="smm-detail-logo" href="/"><span className="brand-mark" aria-hidden="true" /><span>LOGOGE</span></a>
        <nav className="smm-detail-nav" aria-label="Основные разделы">
          <a href="/#branding">Branding</a>
          <a href="/#smm">SMM</a>
          <a href="/#academy">Academy</a>
          <a href="/#event-reels">Event Reels</a>
          <a href="/#web">Web</a>
          <a href="/#team">Team</a>
        </nav>
        <a className="smm-back" href={backHref}><i className="ui-arrow ui-arrow-back" aria-hidden="true" /> Назад</a>
      </header>

      <section className="contacts-page-content">
        <div>
          <p className="eyebrow">Начнём с идеи</p>
          <h1>Давайте<br /><em>поговорим.</em></h1>
          {selection && <p className="selected-package">Вы выбрали <strong>{selection}</strong></p>}
        </div>
        <div className="contacts-page-actions">
          <a className="contacts-primary" href={whatsapp} target="_blank" rel="noreferrer">Написать в WhatsApp <span className="ui-arrow" aria-hidden="true" /></a>
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
