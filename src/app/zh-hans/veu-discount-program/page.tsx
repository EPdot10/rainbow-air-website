import { pageMetadata } from "@/i18n/meta";
import { VeuView } from "@/views/VeuView";

export const metadata = pageMetadata("veu", "zh-hans");

export default function Page() {
  return <VeuView locale="zh-hans" />;
}
