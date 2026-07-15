import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Страница не найдена | LOGOGE",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-orbit" aria-hidden="true" />
      <a className="not-found-logo" href="/"><span className="brand-mark" aria-hidden="true" /><span>LOGOGE</span></a>
      <section>
        <p className="eyebrow">404 · Lost in the process</p>
        <h1>Эта страница<br /><em>ещё не стала</em><br />брендом.</h1>
        <p>Похоже, такой страницы нет или она переехала. Вернёмся к идеям, которые уже работают.</p>
        <Link href="/" className="not-found-link">На главную <i className="ui-arrow" aria-hidden="true" /></Link>
      </section>
    </main>
  );
}
