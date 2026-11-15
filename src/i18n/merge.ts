/**
 * Translations only override text: ids, icons, images and links always come from the English
 * source, so the Chinese files stay small and can never break the page structure.
 */
export type Overrides<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly (Overrides<U> | undefined)[]
    : T extends object
      ? { [K in keyof T]?: Overrides<T[K]> }
      : never;

export function deepMerge<T>(base: T, ov: unknown): T {
  if (ov === undefined || ov === null) return base;
  if (typeof base === "string") return (typeof ov === "string" ? ov : base) as T;
  if (Array.isArray(base)) {
    const arr = Array.isArray(ov) ? ov : [];
    return base.map((b, i) => deepMerge(b, arr[i])) as T;
  }
  if (base && typeof base === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(base)) out[k] = deepMerge(v, (ov as Record<string, unknown>)[k]);
    return out as T;
  }
  return base;
}
