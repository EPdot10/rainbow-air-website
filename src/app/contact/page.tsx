import { pageMetadata } from "@/i18n/meta";
import { ContactView } from "@/views/ContactView";

export const metadata = pageMetadata("contact", "en");

export default function Page() {
  return <ContactView locale="en" />;
}
