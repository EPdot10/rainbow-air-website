import { ChevronDown } from "lucide-react";
import { getDict } from "@/i18n/server";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Short VEU FAQ – collapsed by default so the page stays compact; answers remain in the HTML for search engines. */
export function VeuFaq() {
  const f = getDict().c.veuPage.faq;
  return (
    <section id="veu-faq" aria-labelledby="veu-faq-title" className="scroll-mt-24 py-20 sm:py-24">
      <div className="container-page max-w-3xl">
        <SectionHeading id="veu-faq-title" eyebrow={f.eyebrow} title={f.title} align="center" />
        <div className="mt-10 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white shadow-card">
          {f.items.map((it) => (
            <details key={it.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[1.02rem] font-bold text-navy-900 transition-colors hover:bg-navy-50 sm:px-6 [&::-webkit-details-marker]:hidden">
                <h3>{it.q}</h3>
                <ChevronDown className="size-5 shrink-0 text-flame-600 transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <p className="px-5 pb-5 text-[0.97rem] leading-relaxed sm:px-6">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
