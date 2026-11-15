import type { Locale } from "@/lib/locale";
import { setRequestLocale } from "@/i18n/server";
import { LegalPage } from "@/components/legal/LegalPage";

export function LegalView({ locale, kind }: { locale: Locale; kind: "privacy" | "terms" }) {
  setRequestLocale(locale);
  return <LegalPage kind={kind} />;
}
