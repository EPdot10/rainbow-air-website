import { ArrowRight } from "lucide-react";
import { brandLogos, commercialProjects, homeShowcase, illustrativeLabel, sampleReviews } from "@/data/content";
import { quoteHref } from "@/lib/quote";
import { resolveImage } from "@/lib/images";
import { avatarDataUri } from "@/lib/avatars";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { ButtonLink } from "@/components/ui/Button";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { Reveal } from "@/components/ui/Reveal";
import { ReviewsCarousel } from "@/components/sections/ReviewsCarousel";

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

/* ───────────── Customer reviews (SAMPLE, carousel) ───────────── */

export function CustomerReviews() {
  const c = homeShowcase.reviews;
  const reviews = sampleReviews.map((r, i) => ({ ...r, avatar: avatarDataUri(r.name, i) }));
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="overflow-hidden bg-surface py-20 sm:py-24 lg:py-28">
      <div className="container-page">
        <SectionHeading id="reviews-title" eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} align="center" />
        <div className="mt-12">
          <ReviewsCarousel reviews={reviews} />
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted">{c.note}</p>
      </div>
    </section>
  );
}

/* ───────────── Brands strip (EA-style band above the footer) ───────────── */

function BrandLogo({ name, image }: { name: string; image: (typeof brandLogos)[number]["image"] }) {
  const img = resolveImage(image);
  return (
    <li className="flex h-20 w-44 shrink-0 items-center justify-center px-6 sm:w-52">
      <img
        src={img.src}
        alt={`${name} logo`}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        className="max-h-11 w-auto max-w-full object-contain opacity-70 grayscale transition-[filter,opacity] duration-300 hover:opacity-100 hover:grayscale-0"
      />
    </li>
  );
}

export function BrandStrip() {
  const c = homeShowcase.brands;
  return (
    <section id="brands" aria-labelledby="brands-title" className="border-t border-line bg-white py-14 sm:py-16">
      <div className="container-page text-center">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-flame-600">{c.eyebrow}</p>
        <h2 id="brands-title" className="mx-auto mt-3 max-w-3xl text-2xl font-bold text-navy-900 sm:text-3xl">
          {c.title}
        </h2>
      </div>
      <div className="brand-marquee group relative mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <ul className="brand-track flex w-max motion-reduce:mx-auto motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:justify-center">
          {brandLogos.map((b) => (
            <BrandLogo key={b.name} {...b} />
          ))}
          {brandLogos.map((b) => (
            <li key={`${b.name}-dup`} aria-hidden className="contents motion-reduce:hidden">
              <BrandLogoDup {...b} />
            </li>
          ))}
        </ul>
      </div>
      <p className="container-page mt-6 text-center text-xs text-muted">{c.note}</p>
    </section>
  );
}

function BrandLogoDup({ image }: { name: string; image: (typeof brandLogos)[number]["image"] }) {
  const img = resolveImage(image);
  return (
    <span className="flex h-20 w-44 shrink-0 items-center justify-center px-6 sm:w-52">
      <img src={img.src} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" className="max-h-11 w-auto max-w-full object-contain opacity-70 grayscale" />
    </span>
  );
}
