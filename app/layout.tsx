import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LOGOGE — Там, где идея становится брендом",
  description: "Брендинг, SMM, обучение, Event Reels и создание сайтов в Грузии.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
