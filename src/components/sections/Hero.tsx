import { ArrowRight, Check } from "lucide-react";
import { hero } from "@/data/content";
import { heroHighlights } from "@/data/site";
import { SmartImage } from "@/components/ui/SmartImage";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-navy-950">
      <div className="absolute inset-0 -z-10">
        <SmartImage image={hero.image} priority sizes="100vw" maxWidth={2400} className="object-[65%_center]" />
        {/* Legibility overlays: strong navy on the text side, fading to clear over the image. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(90deg,rgb(2_23_52/0.94)_0%,rgb(2_23_52/0.82)_38%,rgb(2_23_52/0.35)_68%,rgb(2_23_52/0.1)_100%)] max-lg:bg-[linear-gradient(180deg,rgb(2_23_52/0.55)_0%,rgb(2_23_52/0.86)_55%,rgb(2_23_52/0.95)_100%)]"
        />
      </div>

      <div className="container-page flex min-h-[min(46rem,calc(100svh-5rem))] flex-col justify-center py-20 lg:py-28">
        <div className="max-w-[40rem]">
          <Eyebrow tone="light">{hero.eyebrow}</Eyebrow>
          <h1
            id="hero-title"
            className="mt-5 text-[2.35rem] leading-[1.06] font-bold tracking-[-0.025em] text-white sm:text-5xl lg:text-[3.6rem]"
          >
            {hero.title}
          </h1>
          <p className="mt-5 inline-flex flex-col font-display text-xl font-semibold text-white sm:text-2xl">
            {hero.slogan}
            <span aria-hidden className="rb-full mt-2 h-[3px] w-full max-w-[17rem] rounded-full" />
          </p>
          <p className="mt-6 max-w-xl text-[1.06rem] leading-relaxed text-white/82 sm:text-lg">{hero.body}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
              <ArrowRight className="size-[1.1rem] transition-transform group-hover:translate-x-0.5" aria-hidden />
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} size="lg" variant="ghost-light">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>

          <ul className="mt-10 grid gap-3 border-t border-white/15 pt-7 text-[0.95rem] text-white/85 sm:grid-cols-3 sm:gap-5">
            {heroHighlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5">
                <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-white/12 ring-1 ring-white/25">
                  <Check className="size-3 text-white" strokeWidth={3} aria-hidden />
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
