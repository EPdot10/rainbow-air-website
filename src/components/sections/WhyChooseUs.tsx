import { FileCheck2, LifeBuoy, Route, Ruler } from "lucide-react";
import { benefits, sectionCopy } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const icons = { ruler: Ruler, file: FileCheck2, route: Route, shield: LifeBuoy } as const;
const accents = ["text-rb-red", "text-rb-orange", "text-rb-green", "text-rb-blue"];

export function WhyChooseUs() {
  const c = sectionCopy.why;
  return (
    <section id="why-rainbow-air" aria-labelledby="why-title" className="py-20 sm:py-24 lg:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading id="why-title" eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />
        </div>

        <ul className="grid gap-5 sm:grid-cols-2">
          {benefits.map((b, i) => {
            const Icon = icons[b.icon];
            return (
              <Reveal
                as="li"
                key={b.title}
                delay={i * 0.06}
                className="relative rounded-2xl border border-line bg-white p-7 shadow-card transition-shadow duration-300 hover:shadow-lift"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-navy-50 ring-1 ring-navy-900/5">
                  <Icon className={`size-6 ${accents[i]}`} strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-5 text-[1.2rem] font-bold leading-snug">{b.title}</h3>
                <p className="mt-2.5 leading-relaxed">{b.body}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
