import type { Metadata } from "next";
import "./globals.css";
import { CookieConsent } from "./components/cookie-consent";
import { siteName, siteUrl } from "./site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "LOGOGE — Там, где идея становится брендом",
  description: "Брендинг, SMM, обучение, Event Reels и создание сайтов в Грузии.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    siteName,
    title: "LOGOGE — Там, где идея становится брендом",
    description: "Брендинг, SMM, обучение, Event Reels и создание сайтов в Грузии.",
    images: [{ url: "/assets/hero-hq.png", width: 1200, height: 630, alt: "LOGOGE — creative studio" }],
  },
  twitter: { card: "summary_large_image", title: "LOGOGE — Там, где идея становится брендом", description: "Брендинг, SMM, обучение, Event Reels и создание сайтов в Грузии.", images: ["/assets/hero-hq.png"] },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
  icons: {
    icon: [{ url: "/assets/logoge-favicon.png?v=2", type: "image/png", sizes: "512x512" }],
    shortcut: "/assets/logoge-favicon.png?v=2",
    apple: "/assets/logoge-favicon.png?v=2",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <head>
        <link rel="preload" href="/assets/hero-video-3.mp4" as="video" type="video/mp4" />
      </head>
      <body>{children}<CookieConsent /></body>
    </html>
  );
}
