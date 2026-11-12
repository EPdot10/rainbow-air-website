"use client";

import { AlertCircle, AlertTriangle, ArrowRight, CheckCircle2, Loader2, Pencil } from "lucide-react";
import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { enquiryTypes, formConfig, installationRequirements, isDemoMode, roomOptions } from "@/data/form";
import { packages } from "@/data/packages";
import { productQuoteLabel, products } from "@/data/products";
import { useQuote } from "@/context/QuoteContext";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Fields = {
  fullName: string;
  phone: string;
  email: string;
  suburb: string;
  enquiryType: string;
  installation: string;
  rooms: string;
  preferred: string;
  message: string;
};

const empty: Fields = {
  fullName: "",
  phone: "",
  email: "",
  suburb: "",
  enquiryType: "",
  installation: "",
  rooms: "",
  preferred: "",
  message: "",
};

type Errors = Partial<Record<keyof Fields, string>>;

const preferredOptions = [
  ...packages.map((p) => `${p.label}: ${p.name} (${p.systemType})`),
  ...products.map(productQuoteLabel),
  "Not sure yet – please recommend",
];

function validate(v: Fields): Errors {
  const e: Errors = {};
  if (v.fullName.trim().length < 2) e.fullName = "Please enter your full name.";
  const digits = v.phone.replace(/[^\d]/g, "");
  if (!v.phone.trim()) e.phone = "Please enter a phone number.";
  else if (!/^[\d\s()+-]+$/.test(v.phone) || digits.length < 8 || digits.length > 12)
    e.phone = "Please enter a valid Australian phone number, e.g. 0412 345 678.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.suburb.trim().length < 3) e.suburb = "Please enter your suburb or postcode.";
  else if (/^\d+$/.test(v.suburb.trim()) && !/^3\d{3}$/.test(v.suburb.trim()))
    e.suburb = "Victorian postcodes are 4 digits starting with 3.";
  if (!v.enquiryType) e.enquiryType = "Please choose an enquiry type.";
  if (!v.installation) e.installation = "Please tell us whether this is a new installation or a replacement.";
  if (v.message.length > 2000) e.message = "Please keep additional information under 2,000 characters.";
  return e;
}

const order: (keyof Fields)[] = ["fullName", "phone", "email", "suburb", "enquiryType", "installation", "rooms", "preferred", "message"];

type Status = "idle" | "submitting" | "demo" | "sent" | "error";

export function QuoteEnquiryForm() {
  const { prefill } = useQuote();
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [prefilledFrom, setPrefilledFrom] = useState<string | null>(null);
  const demo = isDemoMode();

  // Apply prefill from any "Get a Quote" button – fields stay editable.
  // (State is adjusted during render when a new request arrives – no effect needed.)
  const [appliedNonce, setAppliedNonce] = useState<number | null>(null);
  if (prefill && prefill.nonce !== appliedNonce) {
    setAppliedNonce(prefill.nonce);
    setValues((v) => ({
      ...v,
      enquiryType: prefill.enquiryType ?? v.enquiryType,
      preferred: prefill.preferred ?? v.preferred,
      installation: prefill.installation ?? v.installation,
    }));
    setPrefilledFrom(prefill.preferred ?? prefill.enquiryType ?? null);
    setStatus("idle");
  }

  const id = (f: keyof Fields) => `${uid}-${f}`;

  const set = (f: keyof Fields) => (e: { target: { value: string } }) => {
    const next = { ...values, [f]: e.target.value };
    setValues(next);
    if (touched[f]) setErrors((prev) => ({ ...prev, [f]: validate(next)[f] }));
  };
  const blur = (f: keyof Fields) => () => {
    setTouched((t) => ({ ...t, [f]: true }));
    setErrors((prev) => ({ ...prev, [f]: validate(values)[f] }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched(Object.fromEntries(order.map((k) => [k, true])));
    const first = order.find((k) => errs[k]);
    if (first) {
      document.getElementById(id(first))?.focus();
      return;
    }
    if (demo) {
      // DEMO MODE: nothing is sent or stored, so we must not show a success message.
      setStatus("demo");
      return;
    }
    try {
      setStatus("submitting");
      const res = await fetch(formConfig.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, submittedAt: new Date().toISOString(), page: location.href }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setValues(empty);
      setTouched({});
    } catch {
      setStatus("error");
    }
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  if (status === "demo" || status === "sent") {
    const isDemo = status === "demo";
    return (
      <div role="status" aria-live="polite" className="rounded-2xl border border-line bg-white p-7 shadow-card sm:p-9">
        <span
          className={cn(
            "inline-flex size-12 items-center justify-center rounded-full",
            isDemo ? "bg-flame-50 text-flame-600" : "bg-green-50 text-green-700",
          )}
        >
          {isDemo ? <AlertTriangle className="size-6" aria-hidden /> : <CheckCircle2 className="size-6" aria-hidden />}
        </span>
        <h3 className="mt-4 text-2xl font-bold">{isDemo ? "Demo Mode – enquiry not sent" : "Thanks – your enquiry has been sent"}</h3>
        {isDemo ? (
          <div className="mt-3 space-y-3 leading-relaxed">
            <p>
              Your details passed validation, but this demo website is not yet connected to an enquiry service, so{" "}
              <strong className="text-ink">nothing has been sent or saved</strong>.
            </p>
            <p className="text-muted">
              When the live form is connected, this enquiry would be delivered to the Rainbow Air team. Please contact Rainbow
              Air directly in the meantime.
            </p>
            <dl className="mt-4 grid gap-x-6 gap-y-2 rounded-xl bg-surface p-4 text-sm sm:grid-cols-2">
              {(
                [
                  ["Enquiry type", values.enquiryType],
                  ["Requirement", values.installation],
                  ["Suburb / postcode", values.suburb],
                  ["Package / model", values.preferred || "—"],
                ] as const
              ).map(([k, v]) => (
                <div key={k}>
                  <dt className="text-muted">{k}</dt>
                  <dd className="font-semibold text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : (
          <p className="mt-3 leading-relaxed">Our team will be in touch to discuss suitable options for your home.</p>
        )}
        <Button variant="outline" className="mt-7" onClick={() => setStatus("idle")}>
          <Pencil className="size-4" aria-hidden />
          {isDemo ? "Back to form" : "Send another enquiry"}
        </Button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-labelledby="quote-form-heading"
      className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 id="quote-form-heading" tabIndex={-1} className="text-xl font-bold outline-none">
          Quote enquiry
        </h3>
        {demo && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-flame-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-flame-700 ring-1 ring-flame-600/20">
            <span aria-hidden className="size-1.5 rounded-full bg-flame-600" />
            Demo Mode
          </span>
        )}
      </div>
      {demo && (
        <p className="mt-2 text-sm text-muted">Form submission is not connected yet – enquiries are validated but not sent.</p>
      )}

      {prefilledFrom && (
        <p className="mt-4 flex items-start gap-2 rounded-lg bg-sky-50 px-3.5 py-2.5 text-sm text-navy-800" aria-live="polite">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-sky-600" aria-hidden />
          <span>
            Pre-filled with <strong>{prefilledFrom}</strong>. You can change any field below.
          </span>
        </p>
      )}

      {errorCount > 0 && (
        <p role="alert" className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-800">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          Please check the {errorCount === 1 ? "highlighted field" : `${errorCount} highlighted fields`} below.
        </p>
      )}

      <div className="mt-6 grid gap-x-5 gap-y-5 sm:grid-cols-2">
        <Field id={id("fullName")} label="Full Name" required error={touched.fullName ? errors.fullName : undefined}>
          {(p) => <input {...p} type="text" autoComplete="name" value={values.fullName} onChange={set("fullName")} onBlur={blur("fullName")} />}
        </Field>
        <Field id={id("phone")} label="Phone Number" required error={touched.phone ? errors.phone : undefined}>
          {(p) => (
            <input {...p} type="tel" inputMode="tel" autoComplete="tel" placeholder="04xx xxx xxx" value={values.phone} onChange={set("phone")} onBlur={blur("phone")} />
          )}
        </Field>
        <Field id={id("email")} label="Email Address" required error={touched.email ? errors.email : undefined}>
          {(p) => <input {...p} type="email" autoComplete="email" value={values.email} onChange={set("email")} onBlur={blur("email")} />}
        </Field>
        <Field id={id("suburb")} label="Suburb / Postcode" required error={touched.suburb ? errors.suburb : undefined}>
          {(p) => (
            <input {...p} type="text" autoComplete="address-level2" placeholder="e.g. Box Hill or 3128" value={values.suburb} onChange={set("suburb")} onBlur={blur("suburb")} />
          )}
        </Field>
        <Field id={id("enquiryType")} label="Enquiry Type" required error={touched.enquiryType ? errors.enquiryType : undefined}>
          {(p) => (
            <select {...p} value={values.enquiryType} onChange={set("enquiryType")} onBlur={blur("enquiryType")}>
              <option value="" disabled>
                Select an option
              </option>
              {enquiryTypes.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          )}
        </Field>
        <Field id={id("rooms")} label="Number of Rooms" hint="Rooms to heat or cool">
          {(p) => (
            <select {...p} value={values.rooms} onChange={set("rooms")}>
              <option value="">Select (optional)</option>
              {roomOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          )}
        </Field>

        <fieldset
          className="sm:col-span-2"
          aria-describedby={touched.installation && errors.installation ? `${id("installation")}-error` : undefined}
        >
          <legend className="text-sm font-semibold text-ink">
            Installation Requirement <span className="text-flame-600" aria-hidden>*</span>
            <span className="sr-only"> (required)</span>
          </legend>
          <div className="mt-2 grid gap-2.5 sm:grid-cols-3">
            {installationRequirements.map((opt, i) => (
              <label
                key={opt}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-[0.95rem] font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-sky-500",
                  values.installation === opt ? "border-navy-900 bg-navy-50 text-navy-900" : "border-line hover:border-navy-900/40",
                  touched.installation && errors.installation && "border-red-400",
                )}
              >
                <input
                  type="radio"
                  name={`${uid}-installation`}
                  id={i === 0 ? id("installation") : undefined}
                  value={opt}
                  checked={values.installation === opt}
                  onChange={(e) => {
                    set("installation")(e);
                    setTouched((t) => ({ ...t, installation: true }));
                    setErrors((prev) => ({ ...prev, installation: undefined }));
                  }}
                  className="size-4 accent-navy-900 focus:outline-none"
                />
                {opt}
              </label>
            ))}
          </div>
          {touched.installation && errors.installation && (
            <p id={`${id("installation")}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-red-700">
              <AlertCircle className="size-3.5 shrink-0" aria-hidden />
              {errors.installation}
            </p>
          )}
        </fieldset>

        <Field id={id("preferred")} label="Preferred Package / Model" hint="Choose a suggestion or type your own" className="sm:col-span-2">
          {(p) => (
            <>
              <input {...p} type="text" list={`${uid}-preferred-list`} value={values.preferred} onChange={set("preferred")} placeholder="e.g. Package B: Multi-Room Comfort" />
              <datalist id={`${uid}-preferred-list`}>
                {preferredOptions.map((o) => (
                  <option key={o} value={o} />
                ))}
              </datalist>
            </>
          )}
        </Field>
        <Field
          id={id("message")}
          label="Additional Information"
          hint="Rooms, existing system, access, timing – anything that helps"
          className="sm:col-span-2"
          error={touched.message ? errors.message : undefined}
        >
          {(p) => <textarea {...p} rows={4} value={values.message} onChange={set("message")} onBlur={blur("message")} className={cn(p.className, "h-auto py-3")} />}
        </Field>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
          Sorry, your enquiry couldn’t be sent. Please try again in a moment.
        </p>
      )}

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-muted sm:max-w-xs">
          Fields marked <span className="text-flame-600">*</span> are required. A privacy policy will be published before launch.
        </p>
        <Button type="submit" size="lg" disabled={status === "submitting"} className="sm:min-w-[13rem]">
          {status === "submitting" ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
          {demo ? "Check & Preview Enquiry" : "Send Enquiry"}
          {status !== "submitting" && <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />}
        </Button>
      </div>
    </form>
  );
}

interface FieldRenderProps {
  id: string;
  name: string;
  className: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  required?: boolean;
  "aria-required"?: boolean;
}

function Field({
  id,
  label,
  required,
  hint,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: (p: FieldRenderProps) => ReactNode;
}) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {required && (
          <>
            {" "}
            <span className="text-flame-600" aria-hidden>
              *
            </span>
          </>
        )}
      </label>
      {hint && (
        <span id={`${id}-hint`} className="ml-2 text-xs text-muted">
          {hint}
        </span>
      )}
      <div className="mt-1.5">
        {children({
          id,
          name: id.split("-").pop() ?? id,
          "aria-invalid": error ? true : undefined,
          "aria-describedby": describedBy,
          "aria-required": required || undefined,
          className: cn(
            "block h-12 w-full rounded-lg border bg-white px-3.5 text-[0.98rem] text-ink placeholder:text-muted/70 transition-[border-color,box-shadow] focus:border-sky-500 focus:shadow-[0_0_0_3px_rgb(26_139_224/0.18)] focus:outline-none",
            error ? "border-red-400" : "border-line hover:border-navy-900/30",
          ),
        })}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-red-700">
          <AlertCircle className="size-3.5 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}
