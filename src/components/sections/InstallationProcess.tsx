import { CalendarCheck, ClipboardList, MessageSquareText } from "lucide-react";
import { processSteps, sectionCopy } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

const icons = { message: MessageSquareText, clipboard: ClipboardList, calendar: CalendarCheck } as const;

export function InstallationProcess() {
  const c = sectionCopy.process;
  return (
    <section id="how-it-works" aria-labelledby="process-title" className="relative overflow-hidden bg-navy-900 py-20 sm:py-24 lg:py-28">
      {/* Soft arc echoing the logo's rainbow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[22rem] left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full border-[1.5px] border-white/[0.07]"
      />
      <div className="container-page relative">
        <SectionHeading id="process-title" eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} tone="light" align="center" />

        <ol className="relative mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
          <div aria-hidden className="rb-full absolute top-8 right-[16.6%] left-[16.6%] hidden h-[2px] opacity-60 md:block" />
          {processSteps.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <Reveal as="li" key={s.step} delay={i * 0.1} className="relative flex gap-5 md:flex-col md:items-center md:text-center">
                <span className="relative z-10 inline-flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-[0_10px_30px_-10px_rgb(0_0_0/0.5)]">
                  <Icon className="size-7 text-navy-900" strokeWidth={1.75} aria-hidden />
                </span>
                <div>
                  <p className="font-display text-sm font-bold tracking-[0.16em] text-rb-yellow">STEP {s.step}</p>
                  <h3 className="mt-2 text-[1.3rem] font-bold text-white">{s.title}</h3>
                  <p className="mt-2.5 max-w-sm leading-relaxed text-white/75 md:mx-auto">{s.body}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>

        <div className="mt-14 flex justify-center">
          <ButtonLink href="#quote" size="lg">
            Start with Step 01
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
