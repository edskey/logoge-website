import type { Metadata } from "next";
import type { ReactNode } from "react";
import { translations } from "../i18n";

export const metadata: Metadata = {
  title: translations.ka.we.metaTitle,
  description: translations.ka.we.metaDescription,
  alternates: { canonical: "/we", languages: { ka: "/we", ru: "/ru/we", en: "/en/we" } },
};

export default function WeLayout({ children }: { children: ReactNode }) { return children; }
