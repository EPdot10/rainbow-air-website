import { pageMetadata } from "@/i18n/meta";
import { HomeView } from "@/views/HomeView";

export const metadata = pageMetadata("home", "zh-hant");

export default function Page() {
  return <HomeView locale="zh-hant" />;
}
