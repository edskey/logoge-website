"use client";

import { FormEvent, useState } from "react";

const whatsappBase = "https://wa.me/995550001182";

export default function AcademyApplyPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const submitApplication = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = [
      "Здравствуйте! Хочу оставить заявку на обучение в LOGOGE Academy.",
      `Имя: ${name.trim()}`,
      `Телефон: ${phone.trim()}`,
    ].join("\n");
    window.open(`${whatsappBase}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="academy-apply-page">
      <header className="smm-detail-header academy-apply-header">
        <a className="smm-detail-logo" href="/"><span className="brand-mark" aria-hidden="true" /><span>LOGOGE</span></a>
        <nav className="smm-detail-nav" aria-label="Основные разделы">
          <a href="/#branding">Branding</a>
          <a href="/#smm">SMM</a>
          <a href="/#academy">Academy</a>
          <a href="/#event-reels">Event Reels</a>
          <a href="/#web">Web</a>
          <a href="/#team">Team</a>
        </nav>
        <a className="smm-back" href="/#academy"><i className="ui-arrow ui-arrow-back" aria-hidden="true" /> Назад</a>
      </header>

      <section className="academy-apply-content">
        <div className="academy-apply-copy">
          <p className="eyebrow">Online & Offline · Georgia</p>
          <h1>Начните<br /><em>создавать.</em></h1>
          <p className="academy-apply-lead">Оставьте контакты — мы свяжемся с вами, расскажем о формате обучения и поможем выбрать программу.</p>
          <div className="academy-apply-meta"><span>LOGOGE Academy</span><span>Практика · стратегия · контент</span></div>
        </div>

        <form className="academy-apply-form" onSubmit={submitApplication}>
          <div className="academy-form-heading">
            <span>Заявка на обучение</span>
            <b>2 поля · меньше минуты</b>
          </div>
          <label>
            <span><small>01</small> Ваше имя</span>
            <input type="text" name="name" autoComplete="name" placeholder="Имя" value={name} onChange={(event) => setName(event.target.value)} required />
          </label>
          <label>
            <span><small>02</small> Номер телефона</span>
            <input type="tel" name="phone" autoComplete="tel" inputMode="tel" placeholder="+995 5XX XX XX XX" value={phone} onChange={(event) => setPhone(event.target.value)} required />
          </label>
          <button type="submit"><span>Отправить заявку</span><b><i className="ui-arrow" aria-hidden="true" /></b></button>
          <p>После нажатия откроется WhatsApp с уже заполненной заявкой.</p>
        </form>
      </section>
    </main>
  );
}
