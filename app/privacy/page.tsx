import type { Metadata } from "next";
import { LegalPage } from "../legal-page";

export const metadata: Metadata = {
  title: "კონფიდენციალურობის პოლიტიკა | LOGOGE",
  description: "როგორ ამუშავებს LOGOGE საიტის ვიზიტორებისა და განაცხადების პერსონალურ მონაცემებს.",
  alternates: { canonical: "/privacy", languages: { ka: "/privacy", ru: "/ru/privacy", en: "/en/privacy" } },
};

export default function PrivacyPage() {
  return (
    <LegalPage kind="privacy" />
  );
}
