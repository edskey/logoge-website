import type { Metadata } from "next";
import { LegalPage } from "../legal-page";

export const metadata: Metadata = {
  title: "გამოყენების პირობები | LOGOGE",
  description: "LOGOGE-ის საიტის გამოყენების პირობები.",
  alternates: { canonical: "/terms", languages: { ka: "/terms", ru: "/ru/terms", en: "/en/terms" } },
};

export default function TermsPage() {
  return (
    <LegalPage kind="terms" />
  );
}
