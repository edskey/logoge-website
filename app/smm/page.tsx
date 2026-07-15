import { smmFeatures } from "../smm-data";

const plans = [
  { name: "Start", subtitle: "Базовое ведение", tone: "start", valueIndex: 1 as const },
  { name: "Business", subtitle: "Всё из Start +", tone: "business", valueIndex: 2 as const },
  { name: "Premium", subtitle: "Всё из Business +", tone: "premium", valueIndex: 3 as const },
];

const renderValue = (value: boolean | string) => typeof value === "boolean" ? (
  <span className={`feature-mark ${value ? "is-included" : "is-missing"}`} aria-label={value ? "Включено" : "Не включено"}>{value ? "✓" : "×"}</span>
) : <span className="feature-value">{value}</span>;

export default function SmmDetailsPage() {
  return (
    <main className="smm-detail-page smm-cards-page">
      <header className="smm-detail-header">
        <a className="smm-detail-logo" href="/#smm"><span className="brand-mark" aria-hidden="true" /><span>LOGOGE</span></a>
        <nav className="smm-detail-nav" aria-label="Основные разделы">
          <a href="/#branding">Branding</a>
          <a href="/#smm">SMM</a>
          <a href="/#academy">Academy</a>
          <a href="/#event-reels">Event Reels</a>
          <a href="/#web">Web</a>
          <a href="/#team">Team</a>
        </nav>
        <a className="smm-back" href="/#smm"><i className="ui-arrow ui-arrow-back" aria-hidden="true" /> Назад</a>
      </header>

      <div className="smm-detail-kicker">SMM пакеты</div>

      <section className="smm-packages-shell" aria-label="Состав и выбор пакетов SMM">
        <aside className="smm-package-composer">
          <header>
            <small>Что входит</small>
            <h1>Состав<br />пакета</h1>
          </header>
          <ul>
            {smmFeatures.map(([feature]) => <li key={feature}>{feature}</li>)}
          </ul>
          <footer>Выберите подходящий уровень сопровождения</footer>
        </aside>

        <div className="smm-plan-cards">
          {plans.map((plan) => (
            <a className={`smm-plan-card is-${plan.tone}`} href={`/contacts?service=SMM&package=${plan.name}`} aria-label={`Выбрать пакет ${plan.name}`} key={plan.name}>
              <header>
                <small>{plan.subtitle}</small>
                <h2>{plan.name}</h2>
                <span>Выбрать <i className="ui-arrow" aria-hidden="true" /></span>
              </header>
              <ul>
                {smmFeatures.map((feature) => (
                  <li key={feature[0]}>
                    <small className="smm-mobile-feature">{feature[0]}</small>
                    {renderValue(feature[plan.valueIndex])}
                  </li>
                ))}
              </ul>
              <footer>Перейти к заявке <b><i className="ui-arrow" aria-hidden="true" /></b></footer>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
