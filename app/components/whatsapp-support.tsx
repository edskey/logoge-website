"use client";

import { useLocale } from "../i18n-client";

const messages = {
  ka: "გამარჯობა! მსურს LOGOGE-სთან დაკავშირება.",
  ru: "Здравствуйте! Хочу связаться с LOGOGE.",
  en: "Hello! I would like to contact LOGOGE.",
};

export function WhatsAppSupport() {
  const { locale } = useLocale();
  const href = `https://wa.me/995550001182?text=${encodeURIComponent(messages[locale])}`;

  return (
    <a className="whatsapp-support" href={href} target="_blank" rel="noreferrer" aria-label="WhatsApp support">
      <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3.4a12.4 12.4 0 0 0-10.6 18.8L4 28l6-1.55A12.4 12.4 0 1 0 16 3.4Zm0 22.7a10.2 10.2 0 0 1-5.2-1.42l-.37-.22-3.57.92.96-3.45-.24-.37A10.24 10.24 0 1 1 16 26.1Zm5.6-7.65c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.08-.3-.15-1.25-.46-2.38-1.48a8.93 8.93 0 0 1-1.65-2.06c-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.57-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.48s1.08 2.88 1.23 3.08c.15.2 2.12 3.24 5.14 4.55.72.31 1.28.5 1.72.64.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" /></svg>
      <span>WhatsApp</span>
    </a>
  );
}
