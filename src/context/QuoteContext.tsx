"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { EnquiryType } from "@/data/form";

export interface QuotePrefill {
  enquiryType?: EnquiryType;
  preferred?: string;
  installation?: string;
  /** Changes on every request so repeated clicks on the same card still apply. */
  nonce: number;
}

interface QuoteContextValue {
  prefill: QuotePrefill | null;
  requestQuote: (p: Omit<QuotePrefill, "nonce">) => void;
}

const QuoteContext = createContext<QuoteContextValue | null>(null);

/**
 * Lets any "Get a Quote" button pre-fill the enquiry form and scroll to it.
 */
export function QuoteProvider({ children }: { children: ReactNode }) {
  const [prefill, setPrefill] = useState<QuotePrefill | null>(null);

  const requestQuote = useCallback((p: Omit<QuotePrefill, "nonce">) => {
    setPrefill({ ...p, nonce: Date.now() });
    const target = document.getElementById("quote");
    if (target) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", "#quote");
      // Move keyboard focus to the form once scrolling settles.
      window.setTimeout(() => document.getElementById("quote-form-heading")?.focus({ preventScroll: true }), reduce ? 0 : 600);
    }
  }, []);

  const value = useMemo(() => ({ prefill, requestQuote }), [prefill, requestQuote]);
  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used inside <QuoteProvider>");
  return ctx;
}
