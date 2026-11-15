import type { ReactNode } from "react";
import { PageHero } from "@/components/layout/PageHero";

export interface LegalSection {
  title: string;
  body: ReactNode;
}

/** Shared layout for Privacy Policy / Terms. ⚠ Wording is a draft – legal review recommended before public launch. */
export function LegalPage({ title, crumb, intro, updated, sections }: { title: string; crumb: string; intro: string; updated: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHero compact eyebrow="Legal" title={title} body={intro} crumb={crumb} />
      <section className="py-14 sm:py-20">
        <div className="container-page max-w-3xl">
          {/* ⚠ Draft wording – have it reviewed by a legal professional before public launch. */}
          <p className="text-sm text-muted">Last updated: {updated}</p>
          <nav aria-label="On this page" className="mt-6 rounded-xl border border-line bg-surface p-5">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-navy-700">On this page</p>
            <ol className="mt-3 grid list-decimal gap-1.5 pl-5 text-[0.95rem] sm:grid-cols-2">
              {sections.map((s, i) => (
                <li key={s.title}>
                  <a href={`#section-${i + 1}`} className="text-navy-800 hover:text-flame-600 hover:underline">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="legal-prose mt-10 space-y-10">
            {sections.map((s, i) => (
              <section key={s.title} id={`section-${i + 1}`} aria-labelledby={`section-${i + 1}-title`} className="scroll-mt-28">
                <h2 id={`section-${i + 1}-title`} className="text-xl font-bold sm:text-2xl">
                  {i + 1}. {s.title}
                </h2>
                <div className="mt-3 space-y-3 leading-relaxed [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_ul]:space-y-1.5">{s.body}</div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
