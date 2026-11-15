import { pageMetadata } from "@/i18n/meta";
import { LegalView } from "@/views/LegalView";

export const metadata = pageMetadata("privacy", "zh-hans");

export default function Page() {
  return <LegalView locale="zh-hans" kind="privacy" />;
}
