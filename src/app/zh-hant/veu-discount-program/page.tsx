import { pageMetadata } from "@/i18n/meta";
import { VeuView } from "@/views/VeuView";

export const metadata = pageMetadata("veu", "zh-hant");

export default function Page() {
  return <VeuView locale="zh-hant" />;
}
