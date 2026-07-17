"use client";

import { smmFeatures } from "../smm-data";
import { LanguageSwitch } from "../components/language-switch";
import { getTranslations, localizedPath } from "../i18n";
import { useLocale } from "../i18n-client";

const plans = [
  { name: "Start", subtitle: "Базовое ведение", tone: "start", valueIndex: 1 as const },
  { name: "Business", subtitle: "Всё из Start +", tone: "business", valueIndex: 2 as const },
  { name: "Premium", subtitle: "Всё из Business +", tone: "premium", valueIndex: 3 as const },
];

const renderValue = (value: boolean | string, included: string, excluded: string) => typeof value === "boolean" ? (
  <span className={`feature-mark ${value ? "is-included" : "is-missing"}`} aria-label={value ? included : excluded}>{value ? "✓" : "×"}</span>
) : <span className="feature-value">{value}</span>;

export default function SmmDetailsPage() {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const s = t.smm;
  const home = localizedPath(locale);
  const contacts = localizedPath(locale, "/contacts");
  const localizedFeatures = smmFeatures.map((feature, index) => {
    const values = feature.slice(1).map((value) => {
      if (typeof value !== "string") return value;
      if (index === 5) return value === "Премиальная" ? s.values.premium : s.values.standard;
      if (index === 4 && locale !== "ru") return value.replace(/фотопост(?:а|ов)/, s.values.photoPosts);
      return value;
    });
    return [s.features[index], ...values] as const;
  });
  return (
    <main className="smm-detail-page smm-cards-page">
      <header className="smm-detail-header">
        <a className="smm-detail-logo" href={`${home}#smm`}><span className="brand-mark" aria-hidden="true" /><span>LOGOGE</span></a>
        <nav className="smm-detail-nav" aria-label={t.contacts.navLabel}>
          <a href={`${home}#branding`}>{t.common.services.branding}</a>
          <a href={`${home}#smm`}>SMM</a>
          <a href={`${home}#academy`}>{t.common.services.academy}</a>
          <a href={`${home}#event-reels`}>Event Reels</a>
          <a href={`${home}#web`}>Web</a>
          <a href={localizedPath(locale, "/we")}>{t.common.nav.we}</a>
        </nav>
        <div className="detail-header-actions"><LanguageSwitch /><a className="smm-back" href={`${home}#smm`}><i className="ui-arrow ui-arrow-back" aria-hidden="true" /> {t.common.back}</a></div>
      </header>

      <div className="smm-detail-kicker">{s.kicker}</div>

      <section className="smm-packages-shell" aria-label={s.aria}>
        <aside className="smm-package-composer">
          <header>
            <small>{s.whatIncluded}</small>
            <h1>{s.composition.split("\n").map((part, index) => <span key={part}>{index > 0 && <br />}{part}</span>)}</h1>
          </header>
          <ul>
            {localizedFeatures.map(([feature]) => <li key={feature}>{feature}</li>)}
          </ul>
          <footer>{s.chooseLevel}</footer>
        </aside>

        <div className="smm-plan-cards">
          {plans.map((plan) => (
            <a className={`smm-plan-card is-${plan.tone}`} href={`${contacts}?service=SMM&package=${plan.name}`} aria-label={`${s.planAria} ${plan.name}`} key={plan.name}>
              <header>
                <small>{s.subtitles[plan.valueIndex - 1]}</small>
                <h2>{plan.name}</h2>
                <span>{s.choose} <i className="ui-arrow" aria-hidden="true" /></span>
              </header>
              <ul>
                {localizedFeatures.map((feature) => (
                  <li key={feature[0]}>
                    <small className="smm-mobile-feature">{feature[0]}</small>
                    {renderValue(feature[plan.valueIndex], t.common.included, t.common.excluded)}
                  </li>
                ))}
              </ul>
              <footer>{s.apply} <b><i className="ui-arrow" aria-hidden="true" /></b></footer>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
