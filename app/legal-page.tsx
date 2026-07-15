import type { ReactNode } from "react";

export function LegalPage({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <main className="legal-page">
      <header className="legal-header">
        <a className="smm-detail-logo" href="/"><span className="brand-mark" aria-hidden="true" /><span>LOGOGE</span></a>
        <a className="smm-back" href="/"><i className="ui-arrow ui-arrow-back" aria-hidden="true" /> На главную</a>
      </header>
      <article className="legal-content">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="legal-updated">Версия от 15 июля 2026 года</p>
        <div className="legal-copy">{children}</div>
      </article>
    </main>
  );
}
