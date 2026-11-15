import { getDict } from "@/i18n/server";
import { ArrowRight } from "lucide-react";
import { routes } from "@/data/site";
import type { ImageKey } from "@/data/images";
import { resolveImage } from "@/lib/images";
import { avatarDataUri } from "@/lib/avatars";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ReviewsCarousel } from "@/components/sections/ReviewsCarousel";

/* ───────────── Our team (replaces Commercial Projects) ───────────── */

export function TeamIntro() {
  const { homeShowcase, installTypes } = getDict().c;
  const c = homeShowcase.team;
  return (
    <section id="team" aria-labelledby="team-title" className="py-20 sm:py-24 lg:py-28">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-end lg:gap-16">
          <div>
            <SectionHeading id="team-title" eyebrow={c.eyebrow} title={c.title} />
            <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed">{c.body}</p>
            <ButtonLink href={routes.about} variant="outline" size="lg" className="mt-8">
              {c.cta}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </ButtonLink>
          </div>
          <dl className="grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-white shadow-card">
            {c.stats.map((st) => (
              <div key={st.label} className="px-3 py-5 text-center sm:px-5 sm:py-6">
                <dt className="sr-only">{st.label}</dt>
                <dd>
                  <span className="block font-display text-[1.05rem] leading-tight font-bold [word-break:keep-all] text-navy-900 sm:text-2xl">{st.value}</span>
                  <span aria-hidden className="rb-full mx-auto mt-2.5 block h-[3px] w-8 rounded-full" />
                  <span className="mt-2.5 block text-[0.8rem] leading-snug text-muted sm:text-sm">{st.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {installTypes.map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 0.06}>
              <article className="group/tile relative h-full overflow-hidden rounded-2xl bg-navy-900 shadow-card">
                <div className="relative aspect-[4/5]">
                  <SmartImage
                    image={p.image}
                    sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                    maxWidth={1080}
                    className="transition-transform duration-700 group-hover/tile:scale-[1.05]"
                  />
                  <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rb-yellow">{p.type}</p>
                    <h3 className="mt-1.5 text-lg font-bold text-white">{p.title}</h3>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────── Customer reviews (SAMPLE, carousel) ───────────── */

export function CustomerReviews() {
  const { homeShowcase, sampleReviews } = getDict().c;
  const c = homeShowcase.reviews;
  const reviews = sampleReviews.map((r, i) => ({ ...r, avatar: avatarDataUri(r.name, i) }));
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="overflow-hidden bg-surface py-20 sm:py-24 lg:py-28">
      <div className="container-page">
        <SectionHeading id="reviews-title" eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} align="center" />
        <div className="mt-12">
          <ReviewsCarousel reviews={reviews} />
        </div>
      </div>
    </section>
  );
}

/* ───────────── Brands strip (EA-style band above the footer) ───────────── */

function BrandLogo({ name, image }: { name: string; image: ImageKey }) {
  const img = resolveImage(image);
  return (
    <li className="flex h-20 w-44 shrink-0 items-center justify-center px-6 sm:w-52">
      <img
        src={img.src}
        alt={`${name} logo`}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        className="max-h-11 w-auto max-w-full object-contain"
      />
    </li>
  );
}

export function BrandStrip() {
  const { brandLogos, homeShowcase } = getDict().c;
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

function BrandLogoDup({ image }: { name: string; image: ImageKey }) {
  const img = resolveImage(image);
  return (
    <span className="flex h-20 w-44 shrink-0 items-center justify-center px-6 sm:w-52">
      <img src={img.src} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" className="max-h-11 w-auto max-w-full object-contain" />
    </span>
  );
}
