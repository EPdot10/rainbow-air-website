import { pageMetadata } from "@/i18n/meta";
import { ProjectsView } from "@/views/ProjectsView";

export const metadata = pageMetadata("projects", "zh-hans");

export default function Page() {
  return <ProjectsView locale="zh-hans" />;
}
