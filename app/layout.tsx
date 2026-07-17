import type { Metadata } from "next";
import "./globals.css";
import { CookieConsent } from "./components/cookie-consent";
import { siteName, siteUrl } from "./site";
import { translations } from "./i18n";
import { LanguageProvider } from "./i18n-client";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: translations.ka.home.metaTitle,
  description: translations.ka.home.metaDescription,
  alternates: { canonical: "/", languages: { ka: "/", ru: "/ru", en: "/en" } },
  openGraph: {
    type: "website",
    locale: "ka_GE",
    url: "/",
    siteName,
    title: translations.ka.home.metaTitle,
    description: translations.ka.home.metaDescription,
    images: [{ url: "/assets/hero-hq.png", width: 1200, height: 630, alt: "LOGOGE — creative studio" }],
  },
  twitter: { card: "summary_large_image", title: translations.ka.home.metaTitle, description: translations.ka.home.metaDescription, images: ["/assets/hero-hq.png"] },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
  icons: {
    icon: [{ url: "/assets/logoge-favicon.png?v=2", type: "image/png", sizes: "512x512" }],
    shortcut: "/assets/logoge-favicon.png?v=2",
    apple: "/assets/logoge-favicon.png?v=2",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ka" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/assets/hero-video-3.mp4" as="video" type="video/mp4" />
      </head>
      <body><LanguageProvider initialLocale="ka">{children}<CookieConsent /></LanguageProvider></body>
    </html>
  );
}
