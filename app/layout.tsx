import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LOGOGE — Там, где идея становится брендом",
  description: "Брендинг, SMM, обучение, Event Reels и создание сайтов в Грузии.",
  icons: { icon: "/assets/logoge-mark-exact.png", shortcut: "/assets/logoge-mark-exact.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
