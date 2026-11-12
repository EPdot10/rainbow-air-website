import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { packageDisclosure, packages } from "@/data/packages";
import { homeCopy } from "@/data/content";
import { routes } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PackageCard } from "@/components/cards/PackageCard";

export function FeaturedPackages() {
  const c = homeCopy.packages;
  return (
    <section id="packages" aria-labelledby="packages-title" className="bg-surface py-20 sm:py-24 lg:py-28">
      <div className="container-page">
        <SectionHeading id="packages-title" eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} align="center" />

        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {packages.map((pkg, i) => (
            <Reveal as="li" key={pkg.id} delay={i * 0.08} className={i === 2 ? "md:col-span-2 lg:col-span-1" : undefined}>
              <PackageCard pkg={pkg} featured={i === 1} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mx-auto mt-10 flex max-w-4xl gap-4 rounded-xl border border-line bg-white px-5 py-4 text-sm leading-relaxed text-body sm:px-6">
          <Info className="mt-0.5 size-5 shrink-0 text-sky-600" aria-hidden />
          <div className="space-y-1">
            {packageDisclosure.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 flex justify-center">
          <Link
            href={`${routes.installation}#products`}
            className="group inline-flex items-center gap-2 rounded-lg border border-navy-900/20 bg-white px-6 py-3.5 font-semibold text-navy-900 transition-colors hover:border-navy-900/45 hover:bg-navy-50"
          >
            {c.productsLink}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
