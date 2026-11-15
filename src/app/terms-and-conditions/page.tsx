import { pageMetadata } from "@/i18n/meta";
import { LegalView } from "@/views/LegalView";

export const metadata = pageMetadata("terms", "en");

export default function Page() {
  return <LegalView locale="en" kind="terms" />;
}
