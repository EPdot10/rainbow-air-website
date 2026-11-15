import { LocalizedLink } from "@/components/locale/LocaleComponents";
import { getDict } from "@/i18n/server";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import type { ImageKey } from "@/data/images";
import { SmartImage } from "@/components/ui/SmartImage";
import { Eyebrow } from "@/components/ui/SectionHeading";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  body: string;
  /** Breadcrumb label for this page. */
  crumb: string;
  image?: ImageKey;
  children?: ReactNode;
  /** Shorter hero so the content below (e.g. the enquiry form) is visible on the first screen. */
  compact?: boolean;
  /** Extra block under the text (e.g. social icon row). */
  extra?: ReactNode;
}

/** Compact hero used at the top of every inner page (one H1 per page). */
export function PageHero({ eyebrow, title, body, crumb, image, children, compact, extra }: PageHeroProps) {
  const { ui } = getDict();
  return (
    <section aria-labelledby="page-title" className="relative isolate overflow-hidden bg-navy-950">
      {image && (
        <div className="absolute inset-0 -z-10">
          <SmartImage image={image} priority sizes="100vw" maxWidth={1920} />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(90deg,rgb(2_23_52/0.95)_0%,rgb(2_23_52/0.85)_45%,rgb(2_23_52/0.5)_100%)] max-md:bg-navy-950/85"
          />
        </div>
      )}
      <div className={compact ? "container-page py-8 sm:py-10 lg:py-12" : "container-page py-14 sm:py-20 lg:py-24"}>
        <nav aria-label={ui.common.breadcrumb} className={compact ? "mb-4 text-sm text-white/65" : "mb-6 text-sm text-white/65"}>
          <ol className="flex items-center gap-1.5">
            <li>
              <LocalizedLink href="/" className="hover:text-white">
                {ui.common.home}
              </LocalizedLink>
            </li>
            <li aria-hidden>
              <ChevronRight className="size-3.5" />
            </li>
            <li aria-current="page" className="text-white/90">
              {crumb}
            </li>
          </ol>
        </nav>
        <div className="max-w-3xl">
          <Eyebrow tone="light">{eyebrow}</Eyebrow>
          <h1
            id="page-title"
            className={
              compact
                ? "mt-3 text-[1.9rem] leading-[1.1] font-bold tracking-[-0.02em] text-white sm:text-[2.3rem]"
                : "mt-4 text-[2.1rem] leading-[1.1] font-bold tracking-[-0.02em] text-white sm:text-[2.7rem] lg:text-[3.1rem]"
            }
          >
            {title}
          </h1>
          <p className={compact ? "mt-3 max-w-2xl leading-relaxed text-white/80" : "mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-white/80 sm:text-lg"}>{body}</p>
          {children && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{children}</div>}
          {extra && <div className={compact ? "mt-5" : "mt-8"}>{extra}</div>}
        </div>
      </div>
    </section>
  );
}
