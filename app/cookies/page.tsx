import type { Metadata } from "next";
import { LegalPage } from "../legal-page";

export const metadata: Metadata = {
  title: "ქუქი-ფაილების პოლიტიკა | LOGOGE",
  description: "ინფორმაცია LOGOGE-ის საიტზე აუცილებელი და არასავალდებულო ტექნოლოგიების შესახებ.",
  alternates: { canonical: "/cookies", languages: { ka: "/cookies", ru: "/ru/cookies", en: "/en/cookies" } },
};

export default function CookiesPage() {
  return (
    <LegalPage kind="cookies" />
  );
}
