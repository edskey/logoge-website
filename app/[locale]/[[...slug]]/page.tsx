import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Home from "../../page";
import WePage from "../../we/page";
import SmmDetailsPage from "../../smm/page";
import ContactsPage from "../../contacts/page";
import AcademyApplyPage from "../../academy/apply/page";
import { LegalPage } from "../../legal-page";
import { localizedPath, translations, type Locale } from "../../i18n";
import { LanguageProvider } from "../../i18n-client";

type RouteProps = { params: Promise<{ locale: string; slug?: string[] }> };
const validLocales = new Set(["ru", "en"]);
const validSlugs = new Set(["", "we", "smm", "contacts", "academy/apply", "privacy", "cookies", "terms"]);
function routeKey(slug?: string[]) { return slug?.join("/") ?? ""; }

export function generateStaticParams() {
  const slugs = [undefined, ["we"], ["smm"], ["contacts"], ["academy", "apply"], ["privacy"], ["cookies"], ["terms"]];
  return ["ru", "en"].flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const resolved = await params;
  if (!validLocales.has(resolved.locale)) return {};
  const locale = resolved.locale as Locale;
  const key = routeKey(resolved.slug);
  const t = translations[locale];
  const meta = key === "" ? { title: t.home.metaTitle, description: t.home.metaDescription }
    : key === "we" ? { title: t.we.metaTitle, description: t.we.metaDescription }
    : key === "smm" ? { title: t.smm.metaTitle, description: t.smm.metaDescription }
    : key === "contacts" ? { title: t.contacts.metaTitle, description: t.contacts.metaDescription }
    : key === "academy/apply" ? { title: `LOGOGE Academy | ${t.common.services.academy}`, description: t.academyApply.lead }
    : key === "privacy" ? { title: t.legal.privacy.metaTitle, description: t.legal.privacy.metaDescription }
    : key === "cookies" ? { title: t.legal.cookies.metaTitle, description: t.legal.cookies.metaDescription }
    : key === "terms" ? { title: t.legal.terms.metaTitle, description: t.legal.terms.metaDescription }
    : { title: t.notFound.metaTitle, description: t.home.metaDescription };
  const path = key ? `/${key}` : "/";
  return { ...meta, alternates: { canonical: localizedPath(locale, path), languages: { ka: localizedPath("ka", path), ru: localizedPath("ru", path), en: localizedPath("en", path) } } };
}

export default async function LocalizedRoute({ params }: RouteProps) {
  const resolved = await params;
  if (!validLocales.has(resolved.locale)) notFound();
  const key = routeKey(resolved.slug);
  if (!validSlugs.has(key)) notFound();
  const locale = resolved.locale as Locale;
  const content = key === "" ? <Home />
    : key === "we" ? <WePage />
    : key === "smm" ? <SmmDetailsPage />
    : key === "contacts" ? <ContactsPage />
    : key === "academy/apply" ? <AcademyApplyPage />
    : key === "privacy" ? <LegalPage kind="privacy" />
    : key === "cookies" ? <LegalPage kind="cookies" />
    : <LegalPage kind="terms" />;
  return <LanguageProvider initialLocale={locale}>{content}</LanguageProvider>;
}
