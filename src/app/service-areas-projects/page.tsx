import { pageMetadata } from "@/i18n/meta";
import { ProjectsView } from "@/views/ProjectsView";

export const metadata = pageMetadata("projects", "en");

export default function Page() {
  return <ProjectsView locale="en" />;
}
