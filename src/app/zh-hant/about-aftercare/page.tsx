import { pageMetadata } from "@/i18n/meta";
import { AboutView } from "@/views/AboutView";

export const metadata = pageMetadata("about", "zh-hant");

export default function Page() {
  return <AboutView locale="zh-hant" />;
}
