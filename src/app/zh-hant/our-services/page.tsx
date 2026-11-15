import { pageMetadata } from "@/i18n/meta";
import { ServicesView } from "@/views/ServicesView";

export const metadata = pageMetadata("services", "zh-hant");

export default function Page() {
  return <ServicesView locale="zh-hant" />;
}
