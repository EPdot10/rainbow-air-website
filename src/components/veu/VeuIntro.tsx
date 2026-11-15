import { ArrowUpRight, Building2, CheckCircle2, Flame, PlugZap } from "lucide-react";
import { veuPage } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/ui/Reveal";

const icons = [Building2, Flame, CheckCircle2, PlugZap];

export function VeuIntro() {
  const c = veuPage.intro;
  return (
    <section id="about-veu" aria-labelledby="veu-intro-title" className="py-20 sm:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <div>
          <SectionHeading id="veu-intro-title" eyebrow={c.eyebrow} title={c.title} />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {c.points.map((p, i) => {
              const Icon = icons[i];
              return (
                <Reveal as="li" key={p.title} delay={i * 0.05}>
                  <div className="h-full rounded-2xl border border-line bg-white p-5 shadow-card">
                    <Icon className="size-6 text-flame-600" aria-hidden />
                    <h3 className="mt-3 text-[1.05rem] font-bold">{p.title}</h3>
                    <p className="mt-1.5 text-[0.95rem] leading-relaxed">{p.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
          <a
            href={c.officialHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex max-w-full items-start gap-2 rounded-xl border border-navy-900/15 bg-navy-50 px-5 py-4 font-semibold text-navy-900 transition-colors hover:border-navy-900/40 hover:bg-white"
          >
            <span>{c.officialCta}</span>
            <ArrowUpRight className="mt-0.5 size-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
        <Reveal delay={0.08}>
          <figure>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-navy-50 shadow-lift">
              <SmartImage image="wholeHomeExterior" sizes="(min-width:1024px) 40vw, 100vw" maxWidth={1440} />
            </div>
            <figcaption className="mt-3 text-xs text-muted">{c.imageCredit}</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
