import { ArrowRight, BadgeCheck, CheckCircle2, ClipboardList, Flame, Hammer, PlusCircle, RefreshCw, Users, Wrench } from "lucide-react";
import { routes } from "@/data/site";
import { serviceSteps, serviceWhy, services, servicesCopy } from "@/data/content";
import { quoteHref } from "@/lib/quote";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { LocalizedLink } from "@/components/locale/LocaleComponents";

const serviceIcons = { veu: Flame, new: PlusCircle, replacement: RefreshCw, repair: Wrench } as const;

/** The four services. VEU leads as a wide featured card; each Quote button pre-fills the service. */
export function ServicesList() {
  const c = servicesCopy.list;
  const [featured, ...rest] = services;
  const FeaturedIcon = serviceIcons[featured.id];
  return (
    <section id="services" aria-labelledby="services-title" className="py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="services-title" eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />

        <Reveal className="mt-12">
          <article
            id={`service-${featured.id}`}
            className="relative overflow-hidden rounded-3xl bg-navy-950 p-7 text-white shadow-lift sm:p-10 lg:grid lg:grid-cols-[1.3fr_1fr] lg:gap-12"
          >
            <span aria-hidden className="rb-full absolute inset-x-0 top-0 h-1" />
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
                  <FeaturedIcon className="size-6 text-rb-orange" aria-hidden />
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-rb-yellow ring-1 ring-white/15">
                  <BadgeCheck className="size-3.5" aria-hidden />
                  VEU Accredited Provider
                </span>
              </div>
              <h3 className="mt-5 text-[1.7rem] leading-tight font-bold text-white sm:text-[2rem]">{featured.title}</h3>
              <p className="mt-4 max-w-2xl leading-relaxed text-white/80">{featured.summary}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={featured.primary.href} size="lg">
                  {featured.primary.label}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </ButtonLink>
                <ButtonLink href={quoteHref({ type: "veu", item: featured.quoteItem })} size="lg" variant="ghost-light">
                  Get a VEU Quote
                </ButtonLink>
              </div>
            </div>
            <ol className="mt-10 grid gap-3 self-center sm:grid-cols-2 lg:mt-0 lg:grid-cols-1">
              {featured.steps.map((s, i) => (
                <li key={s} className="flex items-center gap-3 rounded-xl bg-white/[0.06] px-4 py-3.5 ring-1 ring-white/10">
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-navy-900">
                    {i + 1}
                  </span>
                  <span className="font-semibold">{s}</span>
                </li>
              ))}
            </ol>
          </article>
        </Reveal>

        <ul className="mt-6 grid gap-6 md:grid-cols-3">
          {rest.map((s, i) => {
            const Icon = serviceIcons[s.id];
            return (
              <Reveal as="li" key={s.id} delay={i * 0.06}>
                <article id={`service-${s.id}`} className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-card">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-navy-50 ring-1 ring-navy-900/5">
                    <Icon className="size-6 text-navy-800" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
                  <p className="mt-3 flex-1 leading-relaxed">{s.summary}</p>
                  <ButtonLink href={quoteHref({ type: s.id, item: s.quoteItem })} variant="outline" className="mt-6 self-start">
                    Get a Quote
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </ButtonLink>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

const stepIcons = [ClipboardList, CheckCircle2, Hammer, Users];

export function ServiceProcess() {
  const c = servicesCopy.how;
  return (
    <section id="process" aria-labelledby="process-title" className="bg-surface py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="process-title" eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} align="center" />
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {serviceSteps.map((s, i) => {
            const Icon = stepIcons[i];
            return (
              <Reveal as="li" key={s.step} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-line bg-white p-6 shadow-card">
                  <div className="flex items-center justify-between">
                    <Icon className="size-6 text-flame-600" aria-hidden />
                    <span className="font-display text-3xl font-bold text-navy-100">{s.step}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                  <p className="mt-2 text-[0.97rem] leading-relaxed">{s.body}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export function ServiceWhy() {
  const c = servicesCopy.why;
  return (
    <section id="why" aria-labelledby="why-title" className="py-20 sm:py-24">
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="why-title" eyebrow={c.eyebrow} title={c.title} />
          <LocalizedLink
            href={routes.about}
            className="group inline-flex items-center gap-1.5 font-semibold text-navy-800 hover:text-flame-600"
          >
            {c.link}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </LocalizedLink>
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {serviceWhy.map((w, i) => (
            <Reveal as="li" key={w.title} delay={i * 0.06}>
              <div className="flex h-full gap-4 rounded-2xl border border-line bg-white p-6 shadow-card">
                <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-green-600" aria-hidden />
                <div>
                  <h3 className="text-lg font-bold">{w.title}</h3>
                  <p className="mt-1.5 leading-relaxed">{w.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
