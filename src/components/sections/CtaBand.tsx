import { ArrowRight } from "lucide-react";
import { routes } from "@/data/site";
import { quoteHref } from "@/lib/quote";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

interface CtaBandProps {
  title: string;
  body: string;
  primary?: string;
  secondary?: string;
}

/** Closing call-to-action used at the bottom of pages. */
export function CtaBand({ title, body, primary = "Request a Quote", secondary = "Contact Us" }: CtaBandProps) {
  return (
    <section aria-labelledby="cta-title" className="py-16 sm:py-20">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-3xl bg-navy-900 px-7 py-12 text-center sm:px-12 sm:py-14">
          <div aria-hidden className="rb-full absolute inset-x-0 top-0 h-1" />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-40 left-1/2 h-72 w-[46rem] -translate-x-1/2 rounded-full border-[1.5px] border-white/[0.08]"
          />
          <h2 id="cta-title" className="relative text-[1.8rem] leading-tight font-bold text-white sm:text-[2.2rem]">
            {title}
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-lg text-white/75">{body}</p>
          <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={quoteHref()} size="lg">
              {primary}
              <ArrowRight className="size-[1.1rem] transition-transform group-hover:translate-x-0.5" aria-hidden />
            </ButtonLink>
            <ButtonLink href={routes.contact} size="lg" variant="ghost-light">
              {secondary}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
