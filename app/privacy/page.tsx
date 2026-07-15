import type { Metadata } from "next";
import { LegalPage } from "../legal-page";

export const metadata: Metadata = {
  title: "Политика конфиденциальности | LOGOGE",
  description: "Как LOGOGE обрабатывает персональные данные посетителей сайта и заявок.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Legal · Privacy" title="Политика конфиденциальности">
      <p className="legal-intro">Кратко: мы используем контакты только для ответа на запросы и не продаём персональные данные.</p>
      <div className="legal-sections">
        <details className="legal-section"><summary>Какие данные мы получаем</summary><p>Имя, телефон и сведения, которые вы добровольно сообщаете. При переходе в WhatsApp сообщение передаётся этому сервису по вашей инициативе.</p></details>
        <details className="legal-section"><summary>Зачем мы их используем</summary><p>Чтобы ответить на заявку, обсудить услугу или обучение и подготовить предложение. Необязательная аналитика работает только после согласия.</p></details>
        <details className="legal-section"><summary>Передача и хранение</summary><p>Доступ получают только сотрудники и подрядчики, которым это необходимо для ответа. WhatsApp и другие внешние сервисы действуют по собственным правилам.</p></details>
        <details className="legal-section"><summary>Ваши права и контакты</summary><p>Вы можете запросить уточнение, исправление или удаление данных: <a href="mailto:info.logoge@gmail.com">info.logoge@gmail.com</a> · <a href="tel:+995550001182">+995 550 00 11 82</a>.</p></details>
      </div>
    </LegalPage>
  );
}
