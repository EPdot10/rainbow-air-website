import { ArrowRight, MapPin, Search } from "lucide-react";
import { projectsCopy } from "@/data/content";
import { quoteHref } from "@/lib/quote";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/** Interim service area wording (no map, no suburb list until the client confirms coverage). */
export function ServiceArea() {
  const c = projectsCopy.areas;
  return (
    <section id="service-area" aria-labelledby="area-title" className="bg-surface py-20 sm:py-24">
      <div className="container-page">
        <Reveal className="grid gap-8 rounded-3xl border border-line bg-white p-8 shadow-card sm:p-10 md:grid-cols-[auto_1fr] md:items-center lg:grid-cols-[auto_1fr_auto]">
          <span className="inline-flex size-16 items-center justify-center rounded-2xl bg-navy-50 ring-1 ring-navy-900/5">
            <MapPin className="size-8 text-flame-600" strokeWidth={1.75} aria-hidden />
          </span>
          <div>
            <h2 id="area-title" className="text-xs font-bold uppercase tracking-[0.16em] text-navy-700">
              {c.title}
            </h2>
            <p className="mt-2 text-[1.6rem] leading-tight font-bold text-navy-900 sm:text-[2rem]">{c.summary}</p>
            <p className="mt-3 flex items-start gap-2 leading-relaxed text-muted">
              <Search className="mt-1 size-4 shrink-0" aria-hidden />
              {c.note}
            </p>
          </div>
          <ButtonLink href={quoteHref()} size="lg" className="md:col-span-2 md:justify-self-start lg:col-span-1">
            {c.cta}
            <ArrowRight className="size-[1.1rem] transition-transform group-hover:translate-x-0.5" aria-hidden />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
