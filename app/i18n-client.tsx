"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { pathWithoutLocale, translations, type Locale } from "./i18n";

const languageEvent = "logoge-language-change";
const languageStorageKey = "logoge-language";
type LanguageContextValue = { locale: Locale; changeLocale: (next: Locale) => void };
const LanguageContext = createContext<LanguageContextValue | null>(null);

function localeFromBrowser(): Locale {
  const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const browserLanguage of browserLanguages) {
    const language = browserLanguage.toLowerCase().split("-")[0];
    if (language === "ka" || language === "ru" || language === "en") return language;
  }
  return "ka";
}

function applyDocumentLocale(locale: Locale) {
  document.documentElement.lang = locale;
  document.documentElement.dataset.locale = locale;
  const path = pathWithoutLocale(window.location.pathname);
  const t = translations[locale];
  const meta = path === "/" ? { title: t.home.metaTitle, description: t.home.metaDescription }
    : path === "/we" ? { title: t.we.metaTitle, description: t.we.metaDescription }
    : path === "/smm" ? { title: t.smm.metaTitle, description: t.smm.metaDescription }
    : path === "/contacts" ? { title: t.contacts.metaTitle, description: t.contacts.metaDescription }
    : path === "/privacy" ? { title: t.legal.privacy.metaTitle, description: t.legal.privacy.metaDescription }
    : path === "/cookies" ? { title: t.legal.cookies.metaTitle, description: t.legal.cookies.metaDescription }
    : path === "/terms" ? { title: t.legal.terms.metaTitle, description: t.legal.terms.metaDescription }
    : path === "/academy/apply" ? { title: `LOGOGE Academy | ${t.common.services.academy}`, description: t.academyApply.lead }
    : { title: t.notFound.metaTitle, description: t.home.metaDescription };
  document.title = meta.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
}

export function LanguageProvider({ initialLocale, children }: { initialLocale: Locale; children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  useEffect(() => {
    const saved = window.localStorage.getItem(languageStorageKey);
    const savedLocale = saved === "ka" || saved === "ru" || saved === "en" ? saved : null;
    const hasExplicitLocale = /^\/(ru|en)(?=\/|$)/.test(window.location.pathname);
    if (!hasExplicitLocale) {
      const preferredLocale = savedLocale ?? localeFromBrowser();
      if (preferredLocale !== locale) setLocale(preferredLocale);
    }
    applyDocumentLocale(locale);
  }, [locale]);

  useEffect(() => {
    const sync = (event: Event) => setLocale((event as CustomEvent<Locale>).detail);
    window.addEventListener(languageEvent, sync);
    return () => window.removeEventListener(languageEvent, sync);
  }, []);

  const changeLocale = useCallback((next: Locale) => {
    setLocale(next);
    window.localStorage.setItem(languageStorageKey, next);
    applyDocumentLocale(next);
    window.dispatchEvent(new CustomEvent<Locale>(languageEvent, { detail: next }));
  }, []);

  const value = useMemo(() => ({ locale, changeLocale }), [locale, changeLocale]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLocale() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLocale must be used inside LanguageProvider");
  return context;
}
