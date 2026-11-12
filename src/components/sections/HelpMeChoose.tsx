import { ArrowRight, Lightbulb } from "lucide-react";
import { installationCopy } from "@/data/content";
import { quoteHref } from "@/lib/quote";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function HelpMeChoose() {
  const c = installationCopy.help;
  return (
    <section id="help-me-choose" aria-labelledby="help-title" className="pt-20 sm:pt-24">
      <div className="container-page">
        <Reveal className="grid gap-8 rounded-3xl border border-line bg-white p-8 shadow-card sm:p-10 md:grid-cols-[auto_1fr_auto] md:items-center">
          <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-flame-50 ring-1 ring-flame-600/10">
            <Lightbulb className="size-7 text-flame-600" strokeWidth={1.75} aria-hidden />
          </span>
          <div>
            <h2 id="help-title" className="text-[1.6rem] leading-tight font-bold sm:text-[1.9rem]">
              {c.title}
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed">{c.body}</p>
          </div>
          <ButtonLink href={quoteHref({ type: "help" })} size="lg">
            {c.cta}
            <ArrowRight className="size-[1.1rem] transition-transform group-hover:translate-x-0.5" aria-hidden />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
