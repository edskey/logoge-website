import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "განაცხადი Academy-ში | LOGOGE",
  description: "დატოვეთ განაცხადი LOGOGE Academy-ში სწავლებაზე.",
  alternates: { canonical: "/academy/apply", languages: { ka: "/academy/apply", ru: "/ru/academy/apply", en: "/en/academy/apply" } },
};

export default function AcademyApplyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
