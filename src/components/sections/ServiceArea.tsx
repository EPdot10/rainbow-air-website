import { ArrowRight, MapPin, Navigation } from "lucide-react";
import { projectsCopy } from "@/data/content";
import { site } from "@/data/site";
import { TBC } from "@/data/types";
import { quoteHref } from "@/lib/quote";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

function Pending({ value }: { value: string }) {
  return value === TBC ? <span className="italic text-muted">[To Be Confirmed]</span> : <span className="font-semibold text-ink">{value}</span>;
}

export function ServiceArea() {
  const c = projectsCopy.areas;
  return (
    <section id="service-area" aria-labelledby="area-title" className="bg-surface py-20 sm:py-24">
      <div className="container-page grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <Reveal>
          <h2 id="area-title" className="text-[2rem] leading-tight font-bold tracking-[-0.02em] sm:text-[2.4rem]">
            {c.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{c.note}</p>
          <ButtonLink href={quoteHref({ type: "general" })} size="lg" className="mt-8">
            Check My Suburb
            <ArrowRight className="size-[1.1rem] transition-transform group-hover:translate-x-0.5" aria-hidden />
          </ButtonLink>
        </Reveal>
        <Reveal delay={0.08}>
          <dl className="divide-y divide-line rounded-2xl border border-line bg-white shadow-card">
            {[
              { icon: MapPin, label: "Region", value: site.contact.serviceArea },
              { icon: Navigation, label: "Main areas covered", value: c.mainAreas },
              { icon: MapPin, label: "Suburbs / postcodes", value: c.suburbs },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4 p-5 sm:p-6">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-navy-50">
                  <Icon className="size-5 text-navy-800" aria-hidden />
                </span>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">{label}</dt>
                  <dd className="mt-0.5">
                    <Pending value={value} />
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
