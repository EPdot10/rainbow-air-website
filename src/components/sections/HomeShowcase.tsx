import { ArrowRight, Building2, Quote, Snowflake, Star } from "lucide-react";
import {
  brandPlaceholders,
  commercialProjects,
  homeShowcase,
  illustrativeLabel,
  partnerPlaceholders,
  sampleReviews,
} from "@/data/content";
import { quoteHref } from "@/lib/quote";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { ButtonLink } from "@/components/ui/Button";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { Reveal } from "@/components/ui/Reveal";

/* ───────────── Commercial projects (illustrative) ───────────── */

export function CommercialProjects() {
  const c = homeShowcase.commercial;
  return (
    <section id="commercial" aria-labelledby="commercial-title" className="py-20 sm:py-24 lg:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="commercial-title" eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />
          <ButtonLink
            href={quoteHref({ type: "general", item: "Commercial project" })}
            variant="outline"
            size="lg"
            className="shrink-0 self-start lg:self-end"
          >
            {c.cta}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </ButtonLink>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {commercialProjects.map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 0.06}>
              <article className="group/tile relative h-full overflow-hidden rounded-2xl bg-navy-900 shadow-card">
                <div className="relative aspect-[4/5]">
                  <SmartImage
                    image={p.image}
                    sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                    maxWidth={1080}
                    className="transition-transform duration-700 group-hover/tile:scale-[1.05]"
                  />
                  <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/25 to-transparent" />
                  <DemoBadge tone="dark" className="absolute top-3 left-3">
                    {illustrativeLabel}
                  </DemoBadge>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rb-yellow">{p.type}</p>
                    <h3 className="mt-1.5 text-lg font-bold text-white">{p.title}</h3>
                    <p className="mt-1 text-sm italic text-white/65">{p.detail}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">{c.note}</p>
      </div>
    </section>
  );
}

/* ───────────── Customer reviews (SAMPLE placeholders) ───────────── */

export function CustomerReviews() {
  const c = homeShowcase.reviews;
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="bg-surface py-20 sm:py-24 lg:py-28">
      <div className="container-page">
        <SectionHeading id="reviews-title" eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} align="center" />

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {sampleReviews.map((r, i) => (
            <Reveal as="li" key={r.id} delay={i * 0.07}>
              <figure className="relative flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-card">
                <div className="flex items-center justify-between">
                  <span className="flex gap-0.5 text-rb-yellow" aria-hidden>
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="size-4 fill-current" />
                    ))}
                  </span>
                  <DemoBadge>Sample review</DemoBadge>
                </div>
                <Quote className="mt-5 size-7 text-navy-100" aria-hidden />
                <blockquote className="mt-2 flex-1 text-[1.02rem] leading-relaxed text-ink">“{r.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <span
                    aria-hidden
                    className="inline-flex size-10 items-center justify-center rounded-full bg-navy-50 font-display text-sm font-bold text-navy-800"
                  >
                    RA
                  </span>
                  <span>
                    <span className="block font-semibold text-ink italic">{r.name}</span>
                    <span className="block text-sm text-muted italic">{r.detail}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted">{c.note}</p>
      </div>
    </section>
  );
}

/* ───────────── Brands & partner companies (logo placeholders) ───────────── */

function LogoSlot({ icon: Icon, label, index }: { icon: typeof Snowflake; label: string; index: number }) {
  return (
    <li className="flex h-24 flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-navy-900/15 bg-white text-muted transition-colors hover:border-navy-900/35">
      <Icon className="size-5 text-navy-700/50" aria-hidden />
      <span className="text-xs font-semibold tracking-wide">
        {label} {index}
      </span>
    </li>
  );
}

export function BrandsPartners() {
  const c = homeShowcase.partners;
  return (
    <section id="partners" aria-labelledby="partners-title" className="py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="partners-title" eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} align="center" />

        <Reveal className="mt-12">
          <h3 className="text-center text-xs font-bold uppercase tracking-[0.16em] text-navy-700">{c.brandsLabel}</h3>
          <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: brandPlaceholders }).map((_, i) => (
              <LogoSlot key={i} icon={Snowflake} label="Brand logo" index={i + 1} />
            ))}
          </ul>
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-4xl" delay={0.06}>
          <h3 className="text-center text-xs font-bold uppercase tracking-[0.16em] text-navy-700">{c.partnersLabel}</h3>
          <ul className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {Array.from({ length: partnerPlaceholders }).map((_, i) => (
              <LogoSlot key={i} icon={Building2} label="Partner logo" index={i + 1} />
            ))}
          </ul>
        </Reveal>

        <p className="mt-8 text-center text-sm text-muted">{c.note}</p>
      </div>
    </section>
  );
}
