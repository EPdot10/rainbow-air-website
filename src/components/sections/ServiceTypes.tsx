import { ArrowRight } from "lucide-react";
import { installationCopy, solutions } from "@/data/content";
import { quoteHref } from "@/lib/quote";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/ui/Reveal";

export function ServiceTypes() {
  const c = installationCopy.systems;

  return (
    <section id="systems" aria-labelledby="solutions-title" className="pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pb-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="solutions-title" eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />
          <a
            href="#products"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-sky-600 underline-offset-4 hover:text-navy-900 hover:underline"
          >
            Compare models
            <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-3 lg:gap-7">
          {solutions.map((s, i) => (
            <Reveal as="li" key={s.id} delay={i * 0.08}>
              <article
                aria-labelledby={`sol-${s.id}`}
                className="group/card flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="relative aspect-[3/2] overflow-hidden bg-navy-50">
                  <SmartImage
                    image={s.image}
                    sizes="(min-width:768px) 33vw, 100vw"
                    maxWidth={1440}
                    className="transition-transform duration-700 group-hover/card:scale-[1.04]"
                  />
                  <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-950/35 to-transparent" />
                  <span className="absolute bottom-4 left-4 font-display text-sm font-bold tracking-wide text-white/95">
                    0{i + 1}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 id={`sol-${s.id}`} className="text-[1.45rem] font-bold tracking-[-0.01em]">
                    {s.name}
                  </h3>
                  <p className="mt-3 leading-relaxed">{s.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${s.name} is well suited to`}>
                    {s.bestFor.map((b) => (
                      <li key={b} className="rounded-full bg-navy-50 px-3 py-1 text-[0.8rem] font-semibold text-navy-800">
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-7">
                    <a
                      href="#products"
                      className="inline-flex items-center gap-1.5 font-semibold text-navy-900 underline-offset-4 hover:underline"
                    >
                      Learn More
                    </a>
                    <a
                      href={quoteHref({ type: "help", item: s.enquiryValue })}
                      className="group inline-flex items-center gap-1.5 font-semibold text-flame-600 underline-offset-4 hover:text-flame-700 hover:underline"
                    >
                      Enquire Now
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </a>
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
