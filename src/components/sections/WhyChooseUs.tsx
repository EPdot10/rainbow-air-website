import { getDict } from "@/i18n/server";
import { BadgePercent, ClipboardCheck, HeartHandshake, Home, UserRound } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const icons = { fit: Home, quote: ClipboardCheck, care: HeartHandshake, contact: UserRound, rebate: BadgePercent } as const;
const accents = ["text-rb-red", "text-rb-orange", "text-rb-green", "text-rb-sky", "text-rb-blue"];

/** Client copy – "Why Choose Rainbow Air?" (5 points). */
export function WhyChooseUs() {
  const { aboutCopy, benefits } = getDict().c;
  const c = aboutCopy.why;
  return (
    <section id="why-rainbow-air" aria-labelledby="why-title" className="bg-surface py-20 sm:py-24 lg:py-28">
      <div className="container-page">
        <SectionHeading id="why-title" eyebrow={c.eyebrow} title={c.title} align="center" />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {benefits.map((b, i) => {
            const Icon = icons[b.icon];
            return (
              <Reveal
                as="li"
                key={b.title}
                delay={i * 0.05}
                className="rounded-2xl border border-line bg-white p-6 shadow-card transition-shadow duration-300 hover:shadow-lift"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-navy-50 ring-1 ring-navy-900/5">
                  <Icon className={`size-6 ${accents[i]}`} strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-5 text-[1.15rem] font-bold leading-snug">{b.title}</h3>
                <p className="mt-2 leading-relaxed">{b.body}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
