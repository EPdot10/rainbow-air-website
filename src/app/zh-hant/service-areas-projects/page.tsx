import { pageMetadata } from "@/i18n/meta";
import { ProjectsView } from "@/views/ProjectsView";

export const metadata = pageMetadata("projects", "zh-hant");

export default function Page() {
  return <ProjectsView locale="zh-hant" />;
}
