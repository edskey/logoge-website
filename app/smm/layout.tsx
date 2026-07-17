import type { Metadata } from "next";
import type { ReactNode } from "react";
import { translations } from "../i18n";

export const metadata: Metadata = { title: translations.ka.smm.metaTitle, description: translations.ka.smm.metaDescription, alternates: { canonical: "/smm", languages: { ka: "/smm", ru: "/ru/smm", en: "/en/smm" } } };
export default function SmmLayout({ children }: { children: ReactNode }) { return children; }
