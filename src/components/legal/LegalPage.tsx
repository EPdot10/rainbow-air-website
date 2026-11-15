import { Fragment, type ReactNode } from "react";
import { routes, site, telHref } from "@/data/site";
import { fmt } from "@/i18n";
import { getDict } from "@/i18n/server";
import { PageHero } from "@/components/layout/PageHero";
import { LocalizedLink } from "@/components/locale/LocaleComponents";

/** Privacy Policy / Terms. ⚠ Wording is a draft – legal review recommended before public launch. */
export function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const { ui, legal } = getDict();
  const doc = legal[kind];
  const vars = { legalName: site.company.legalName, acn: site.company.acn, abn: site.company.abn, name: site.name };

  const render = (text: string): ReactNode => {
    if (text === "{contactLines}")
      return (
        <>
          {ui.footer.phone}:{" "}
          <a className="font-semibold underline" href={telHref(site.contact.phone)}>
            {site.contact.phone}
          </a>
          <br />
          {ui.footer.email}:{" "}
          <a className="font-semibold underline" href={`mailto:${site.contact.email}`}>
            {site.contact.email}
          </a>
        </>
      );
    const parts = fmt(text, vars).split("{privacyLink}");
    return parts.map((part, i) => (
      <Fragment key={i}>
        {part}
        {i < parts.length - 1 && (
          <LocalizedLink href={routes.privacy} className="font-semibold underline">
            {ui.footer.privacy}
          </LocalizedLink>
        )}
      </Fragment>
    ));
  };

  return (
    <>
      <PageHero compact eyebrow={ui.legal.eyebrow} title={doc.title} body={doc.intro} crumb={doc.title} />
      <section className="py-14 sm:py-20">
        <div className="container-page max-w-3xl">
          {/* ⚠ Draft wording – have it reviewed by a legal professional before public launch. */}
          <p className="text-sm text-muted">{fmt(ui.legal.updated, { date: ui.legal.date })}</p>
          {legal.translationNote && <p className="mt-2 text-sm text-muted">{legal.translationNote}</p>}
          <nav aria-label={ui.legal.onThisPage} className="mt-6 rounded-xl border border-line bg-surface p-5">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-navy-700">{ui.legal.onThisPage}</p>
            <ol className="mt-3 grid list-decimal gap-1.5 pl-5 text-[0.95rem] sm:grid-cols-2">
              {doc.sections.map((s, i) => (
                <li key={i}>
                  <a href={`#section-${i + 1}`} className="text-navy-800 hover:text-flame-600 hover:underline">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="mt-10 space-y-10">
            {doc.sections.map((s, i) => (
              <section key={i} id={`section-${i + 1}`} aria-labelledby={`section-${i + 1}-title`} className="scroll-mt-28">
                <h2 id={`section-${i + 1}-title`} className="text-xl font-bold sm:text-2xl">
                  {i + 1}. {s.title}
                </h2>
                <div className="mt-3 space-y-3 leading-relaxed">
                  {s.p?.map((t, k) => <p key={k}>{render(t)}</p>)}
                  {s.list && (
                    <ul className="list-disc space-y-1.5 pl-6">
                      {s.list.map((t, k) => (
                        <li key={k}>{render(t)}</li>
                      ))}
                    </ul>
                  )}
                  {s.after?.map((t, k) => <p key={k}>{render(t)}</p>)}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
