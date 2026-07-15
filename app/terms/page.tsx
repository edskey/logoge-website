import type { Metadata } from "next";
import { LegalPage } from "../legal-page";

export const metadata: Metadata = {
  title: "Пользовательское соглашение | LOGOGE",
  description: "Условия использования сайта LOGOGE.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Legal · Terms" title="Пользовательское соглашение">
      <p className="legal-intro">Используя сайт, вы принимаете эти условия. Заявка не является договором: сроки, стоимость и состав работ согласовываются отдельно.</p>
      <div className="legal-sections">
        <details className="legal-section"><summary>Материалы сайта</summary><p>Тексты, дизайн, логотипы, видео и другие материалы принадлежат LOGOGE или используются законно. Коммерческое использование возможно только с письменного согласия.</p></details>
        <details className="legal-section"><summary>Заявки и коммуникация</summary><p>Отправка заявки не гарантирует оказание услуги. Условия проекта фиксируются отдельно после общения с командой.</p></details>
        <details className="legal-section"><summary>Сторонние сервисы</summary><p>Ссылки на WhatsApp, Instagram, Facebook и другие ресурсы подчиняются правилам соответствующих сервисов.</p></details>
        <details className="legal-section"><summary>Контакты</summary><p>По вопросам использования сайта: <a href="mailto:info.logoge@gmail.com">info.logoge@gmail.com</a>.</p></details>
      </div>
    </LegalPage>
  );
}
