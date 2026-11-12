import Link from "next/link";
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
}

/** Compact hero used at the top of every inner page (one H1 per page). */
export function PageHero({ eyebrow, title, body, crumb, image, children }: PageHeroProps) {
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
      <div className="container-page py-14 sm:py-20 lg:py-24">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/65">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
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
            className="mt-4 text-[2.1rem] leading-[1.1] font-bold tracking-[-0.02em] text-white sm:text-[2.7rem] lg:text-[3.1rem]"
          >
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-white/80 sm:text-lg">{body}</p>
          {children && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{children}</div>}
        </div>
      </div>
    </section>
  );
}
