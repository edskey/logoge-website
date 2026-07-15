"use client";

import { useEffect, useState } from "react";

type Consent = "accepted" | "rejected" | null;
type Fbq = ((...args: unknown[]) => void) & { queue: unknown[][] };
type AnalyticsWindow = Window & typeof globalThis & { dataLayer?: unknown[]; fbq?: Fbq };

const storageKey = "logoge-cookie-consent";

function loadOptionalAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const analyticsWindow = window as AnalyticsWindow;

  if (gaId && !document.getElementById("logoge-ga4")) {
    const script = document.createElement("script");
    script.id = "logoge-ga4";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
    document.head.appendChild(script);
    const dataLayer = analyticsWindow.dataLayer ?? [];
    analyticsWindow.dataLayer = dataLayer;
    const gtag = (...args: unknown[]) => dataLayer.push(args);
    gtag("js", new Date());
    gtag("config", gaId);
  }

  if (metaPixelId && !document.getElementById("logoge-meta-pixel")) {
    const script = document.createElement("script");
    script.id = "logoge-meta-pixel";
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
    const fbq: Fbq = analyticsWindow.fbq ?? Object.assign(
      (...args: unknown[]) => { fbq.queue.push(args); },
      { queue: [] as unknown[][] },
    );
    analyticsWindow.fbq = fbq;
    fbq("init", metaPixelId);
    fbq("track", "PageView");
  }
}

export function CookieConsent() {
  const [consent, setConsent] = useState<Consent | "loading">("loading");

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    const value: Consent = saved === "accepted" || saved === "rejected" ? saved : null;
    setConsent(value);
    if (value === "accepted") loadOptionalAnalytics();
  }, []);

  const save = (value: Exclude<Consent, null>) => {
    window.localStorage.setItem(storageKey, value);
    setConsent(value);
    if (value === "accepted") loadOptionalAnalytics();
  };

  if (consent !== null) return null;

  return (
    <aside className="cookie-banner" aria-label="Настройки cookie">
      <p>Мы используем только необходимые технологии. Необязательная аналитика включается только с вашего согласия. Подробнее — в <a href="/cookies">Политике Cookie</a>.</p>
      <div>
        <button className="cookie-decline" type="button" onClick={() => save("rejected")}>Отклонить</button>
        <button className="cookie-accept" type="button" onClick={() => save("accepted")}>Принять</button>
      </div>
    </aside>
  );
}
