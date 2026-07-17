"use client";

import { useEffect, useRef } from "react";

type TurnstileApi = {
  render: (element: HTMLElement, options: { sitekey: string; theme: "light"; callback: (token: string) => void; "expired-callback": () => void; "error-callback": () => void }) => string;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window { turnstile?: TurnstileApi; }
}

const scriptId = "logoge-turnstile";

export function Turnstile({ onToken }: { onToken: (token: string | null) => void }) {
  const host = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey || !host.current) return;
    const render = () => {
      if (!host.current || !window.turnstile || widgetId.current) return;
      widgetId.current = window.turnstile.render(host.current, {
        sitekey: siteKey,
        theme: "light",
        callback: (token) => onToken(token),
        "expired-callback": () => onToken(null),
        "error-callback": () => onToken(null),
      });
    };
    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (window.turnstile) render();
    else if (existingScript) existingScript.addEventListener("load", render, { once: true });
    else {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.addEventListener("load", render, { once: true });
      document.head.appendChild(script);
    }
    return () => {
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [onToken, siteKey]);

  if (!siteKey) return null;
  return <div className="turnstile" ref={host} aria-label="Spam protection" />;
}
