import type { Metadata } from "next";
import type { ReactNode } from "react";
import { translations } from "../i18n";

export const metadata: Metadata = { title: translations.ka.contacts.metaTitle, description: translations.ka.contacts.metaDescription, alternates: { canonical: "/contacts", languages: { ka: "/contacts", ru: "/ru/contacts", en: "/en/contacts" } } };
export default function ContactsLayout({ children }: { children: ReactNode }) { return children; }
