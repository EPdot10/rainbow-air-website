import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { products } from "@/data/products";
import { installationCopy } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/cards/ProductCard";

export function ProductShowcase() {
  const c = installationCopy.products;
  return (
    <section id="products" aria-labelledby="products-title" className="bg-surface py-20 sm:py-24 lg:py-28">
      <div className="container-page">
        <SectionHeading id="products-title" eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} align="center" />

        <Reveal className="mx-auto mt-8 flex max-w-3xl gap-3 rounded-xl border border-flame-600/20 bg-flame-50 px-5 py-3.5 text-sm leading-relaxed text-flame-700">
          <Info className="mt-0.5 size-[1.1rem] shrink-0" aria-hidden />
          <p>{c.demoNotice}</p>
        </Reveal>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {products.map((p, i) => (
            <Reveal as="li" key={p.id} delay={(i % 3) * 0.07}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </ul>

        <div className="mt-10 flex justify-center">
          <Link
            href="/#packages"
            className="group inline-flex items-center gap-2 rounded-lg border border-navy-900/20 bg-white px-6 py-3.5 font-semibold text-navy-900 transition-colors hover:border-navy-900/45 hover:bg-navy-50"
          >
            {c.packagesLink}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
