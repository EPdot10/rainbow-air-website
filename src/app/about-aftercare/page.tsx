import { pageMetadata } from "@/i18n/meta";
import { AboutView } from "@/views/AboutView";

export const metadata = pageMetadata("about", "en");

export default function Page() {
  return <AboutView locale="en" />;
}
