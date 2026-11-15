import * as contentEn from "@/data/content";
import type { Locale } from "@/lib/locale";
import { deepMerge, type Overrides } from "./merge";
import { uiEn, type Ui } from "./ui";
import { legalEn, type Legal } from "./legal";
import { zhHans } from "./zh-hans";
import { zhHant } from "./zh-hant";

export type Content = typeof contentEn;

export interface Dictionary {
  c: Content;
  ui: Ui;
  legal: Legal;
}

export interface Translation {
  content?: Overrides<Content>;
  ui?: Overrides<Ui>;
  legal?: Overrides<Legal>;
}

const sources: Record<Locale, Translation> = { en: {}, "zh-hans": zhHans, "zh-hant": zhHant };
const memo = new Map<Locale, Dictionary>();

/** Full dictionary for a locale: English structure with the locale's text merged in. */
export function dict(locale: Locale): Dictionary {
  let d = memo.get(locale);
  if (!d) {
    const t = sources[locale] ?? {};
    d = {
      c: deepMerge({ ...contentEn } as Content, t.content),
      ui: deepMerge(uiEn, t.ui),
      legal: deepMerge(legalEn, t.legal),
    };
    memo.set(locale, d);
  }
  return d;
}

export { fmt } from "./ui";
