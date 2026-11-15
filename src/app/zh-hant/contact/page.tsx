import { pageMetadata } from "@/i18n/meta";
import { ContactView } from "@/views/ContactView";

export const metadata = pageMetadata("contact", "zh-hant");

export default function Page() {
  return <ContactView locale="zh-hant" />;
}
