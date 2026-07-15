import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Заявка в Academy | LOGOGE",
  description: "Оставьте заявку на обучение в LOGOGE Academy.",
  alternates: { canonical: "/academy/apply" },
};

export default function AcademyApplyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
