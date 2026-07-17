"use client";

import { LanguageSwitch } from "../components/language-switch";
import { getTranslations, localizedPath } from "../i18n";
import { useLocale } from "../i18n-client";

const team = [
  { name: "Mariana", image: "/assets/team-mariana.jpg", className: "is-mariana" },
  { name: "Sveta", image: "/assets/team-sveta.jpg", className: "is-sveta" },
  { name: "Asy", image: "/assets/team-asy.jpg", className: "is-asy" },
  { name: "Sofia", image: "/assets/team-sophi.jpg", className: "is-sofia" },
  { name: "Amanda", image: "/assets/team-amanda.jpg", className: "is-amanda" },
];

export default function WePage() {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const w = t.we;
  const home = localizedPath(locale);
  return (
    <main className="we-page">
      <header className="we-header">
        <a className="we-logo" href={home}><span className="brand-mark" aria-hidden="true" /><span>LOGOGE</span></a>
        <div className="detail-header-actions"><LanguageSwitch /><a className="we-back" href={home}><i className="ui-arrow ui-arrow-back" aria-hidden="true" /> {t.common.home}</a></div>
      </header>
      <section className="we-hero">
        <div className="we-hero-copy">
          <p className="eyebrow">{w.eyebrow}</p>
          <h1>{w.title}</h1>
          <p>{w.intro}</p>
        </div>
        <div className="we-gallery">
          {team.map((person) => <figure className={`we-member ${person.className}`} key={person.name}><img src={person.image} alt={`${person.name} — ${w.teamAlt}`} /><figcaption>{person.name}</figcaption></figure>)}
        </div>
        <div className="we-roles" aria-label={w.rolesLabel}>{w.roles.map((role) => <span key={role}>{role}</span>)}</div>
        <div className="we-mission"><p className="eyebrow">{w.missionLabel}</p><h2>{w.missionTitle}</h2><p>{w.missionText}</p></div>
      </section>
      <section className="we-story-section we-company"><h2>{w.companyTitle}</h2><p>{w.companyP1}</p><p>{w.companyP2}</p></section>
      <section className="we-story-section we-history"><h2>{w.historyTitle}</h2>{w.history.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>
      <section className="we-story-section we-approach"><h2>{w.approachTitle}</h2>{w.approach.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>
      <section className="we-story-section we-education"><h2>{w.educationTitle}</h2>{w.education.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>
    </main>
  );
}
