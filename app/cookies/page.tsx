import type { Metadata } from "next";
import { LegalPage } from "../legal-page";

export const metadata: Metadata = {
  title: "Политика Cookie | LOGOGE",
  description: "Информация о необходимых и необязательных технологиях на сайте LOGOGE.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalPage eyebrow="Legal · Cookies" title="Политика Cookie">
      <p className="legal-intro">Мы сохраняем только выбор по необязательной аналитике. Никакие рекламные или аналитические сервисы не запускаются до согласия.</p>
      <div className="legal-sections">
        <details className="legal-section"><summary>Необходимые технологии</summary><p>Нужны для базовой работы сайта и запоминания выбора по cookie. Отключить их через баннер нельзя.</p></details>
        <details className="legal-section"><summary>Необязательная аналитика</summary><p>GA4 и Meta Pixel запускаются только после «Принять». При выборе «Отклонить» эти сервисы не загружаются.</p></details>
        <details className="legal-section"><summary>Как изменить выбор</summary><p>Очистите данные сайта в настройках браузера и откройте сайт снова — баннер появится повторно.</p></details>
        <details className="legal-section"><summary>Вопросы</summary><p>Напишите нам: <a href="mailto:info.logoge@gmail.com">info.logoge@gmail.com</a>.</p></details>
      </div>
    </LegalPage>
  );
}
