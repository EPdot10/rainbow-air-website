"use client";

import { AlertCircle, ArrowRight, CheckCircle2, FileArchive, FileText, Film, ImageIcon, Loader2, Paperclip, Pencil, X } from "lucide-react";
import { ACCEPT_ANY, MAX_QUOTE_FILES as MAX_FILES, MAX_TOTAL_BYTES as MAX_TOTAL, MAX_TOTAL_MB, formatSize, uploadKind } from "@/lib/uploads";
import { compressImage } from "@/lib/compressImage";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { enquiryTypes, installationRequirements, submitEnquiry, submitErrorMessage } from "@/data/form";
import { Turnstile, type TurnstileHandle } from "@/components/forms/Turnstile";
import { Button } from "@/components/ui/Button";
import { LocalizedLink, useDict, useLocale } from "@/components/locale/LocaleComponents";
import { fmt } from "@/i18n";
import type { Ui } from "@/i18n/ui";
import { routes } from "@/data/site";
import { cn } from "@/lib/cn";

type Fields = {
  fullName: string;
  phone: string;
  email: string;
  suburb: string;
  enquiryType: string;
  installation: string;
  rooms: string;
  roomNames: string;
  preferred: string;
  existing: string;
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
  roomNames: "",
  preferred: "",
  existing: "",
  message: "",
};

type Errors = Partial<Record<keyof Fields, string>>;

function validate(v: Fields, ui: Ui): Errors {
  const m = ui.form.errors;
  const e: Errors = {};
  if (v.fullName.trim().length < 2) e.fullName = m.name;
  const digits = v.phone.replace(/[^\d]/g, "");
  if (!v.phone.trim()) e.phone = m.phone;
  else if (!/^[\d\s()+-]+$/.test(v.phone) || digits.length < 8 || digits.length > 12) e.phone = m.phoneInvalid;
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = m.email;
  if (v.suburb.trim().length < 3) e.suburb = m.suburb;
  else if (/^\d+$/.test(v.suburb.trim()) && !/^3\d{3}$/.test(v.suburb.trim())) e.suburb = m.postcode;
  if (!v.enquiryType) e.enquiryType = m.enquiryType;
  if (!v.installation) e.installation = m.installation;
  if (v.enquiryType === ui.form.enquiryTypes.veu && v.existing.trim().length < 3) e.existing = m.existing;
  if (v.message.length > 2000) e.message = m.message;
  return e;
}

const kindIcon = { image: ImageIcon, video: Film, pdf: FileText, archive: FileArchive } as const;

const order: (keyof Fields)[] = [
  "fullName",
  "phone",
  "email",
  "suburb",
  "enquiryType",
  "installation",
  "rooms",
  "roomNames",
  "preferred",
  "existing",
  "message",
];

type Status = "idle" | "submitting" | "sent" | "error";

/** Values pre-filled from the link that opened the form (?type=&item=&install=). */
function prefillFrom(params: URLSearchParams, ui: Ui): Partial<Fields> {
  const type = enquiryTypes.find((t) => t.key === params.get("type"));
  const install = installationRequirements.find((r) => r.key === params.get("install"));
  const item = params.get("item")?.slice(0, 200);
  const out: Partial<Fields> = {};
  if (type) out.enquiryType = ui.form.enquiryTypes[type.key];
  if (install) out.installation = ui.form.installTypes[install.key];
  if (item) out.preferred = item;
  return out;
}

/**
 * Reads ?type=&item=&install= from the address bar. Kept in its own tiny Suspense boundary so the form
 * itself is part of the static HTML (visible immediately, even before or without JavaScript).
 */
function SearchParamsReader({ onChange }: { onChange: (key: string) => void }) {
  const key = useSearchParams().toString();
  useEffect(() => onChange(key), [key, onChange]);
  return null;
}

export function QuoteEnquiryForm() {
  const [paramKey, setParamKey] = useState("");
  const uid = useId();
  const { c, ui } = useDict();
  const locale = useLocale();
  const F = ui.form;
  const preferredOptions = [...c.services.map((x) => x.quoteItem), ...c.solutions.map((x) => x.name), F.notSure];
  const [values, setValues] = useState<Fields>(() => ({ ...empty, ...prefillFrom(new URLSearchParams(paramKey), ui) }));
  const [appliedKey, setAppliedKey] = useState(paramKey);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState<string | undefined>();
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const totalSize = files.reduce((n, f) => n + f.size, 0);

  const addFiles = async (list: FileList | null) => {
    if (!list) return;
    setFileError(null);
    const next = [...files];
    let total = totalSize;
    for (const original of Array.from(list)) {
      const kind = uploadKind(original);
      if (!kind) {
        setFileError(F.errors.fileType);
        continue;
      }
      if (next.length >= MAX_FILES) {
        setFileError(fmt(F.errors.tooManyFiles, { max: MAX_FILES }));
        break;
      }
      const f = kind === "image" ? await compressImage(original) : original;
      if (total + f.size > MAX_TOTAL) {
        setFileError(fmt(F.errors.filesTooLarge, { mb: MAX_TOTAL_MB }));
        continue;
      }
      total += f.size;
      next.push(f);
    }
    setFiles(next);
  };
  const turnstile = useRef<TurnstileHandle>(null);

  // A new "Get a Quote" link while already on this page → apply its values (fields stay editable).
  if (paramKey !== appliedKey) {
    setAppliedKey(paramKey);
    setValues((v) => ({ ...v, ...prefillFrom(new URLSearchParams(paramKey), ui) }));
    setStatus("idle");
  }

  const id = (f: keyof Fields) => `${uid}-${f}`;

  // "Request a Quote" links end in #enquiry: make sure the form is brought into view after the page
  // (and the pre-filled values) have rendered – on both desktop and mobile.
  useEffect(() => {
    if (window.location.hash !== "#enquiry") return;
    const go = () => document.getElementById("enquiry")?.scrollIntoView({ block: "start" });
    const t1 = window.setTimeout(go, 60);
    const t2 = window.setTimeout(go, 400);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [paramKey]);

  const set = (f: keyof Fields) => (e: { target: { value: string } }) => {
    const next = { ...values, [f]: e.target.value };
    setValues(next);
    if (touched[f]) setErrors((prev) => ({ ...prev, [f]: validate(next, ui)[f] }));
  };
  const blur = (f: keyof Fields) => () => {
    setTouched((t) => ({ ...t, [f]: true }));
    setErrors((prev) => ({ ...prev, [f]: validate(values, ui)[f] }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate(values, ui);
    setErrors(errs);
    setTouched(Object.fromEntries(order.map((k) => [k, true])));
    const first = order.find((k) => errs[k]);
    if (first) {
      document.getElementById(id(first))?.focus();
      return;
    }
    if (!consent) {
      setConsentError(F.errors.consent);
      document.getElementById("quote-consent")?.focus();
      return;
    }
    if (!token) {
      setErrorText(F.errors.securityWait);
      setStatus("error");
      return;
    }
    setStatus("submitting");
    const data = new FormData();
    data.set("kind", "quote");
    data.set("lang", locale);
    for (const k of order) data.set(k, values[k]);
    data.set("consent", "Yes");
    files.forEach((f) => data.append("files", f, f.name));
    data.set("website", honeypot);
    data.set("cf-turnstile-response", token);
    const result = await submitEnquiry(data);
    turnstile.current?.reset();
    if (result.ok) {
      setStatus("sent");
      setValues(empty);
      setTouched({});
      setFiles([]);
      setConsent(false);
    } else {
      setErrorText(submitErrorMessage(result.error, ui));
      setStatus("error");
    }
  }

  const errorCount = Object.values(errors).filter(Boolean).length;
  const isVeu = values.enquiryType === F.enquiryTypes.veu;

  if (status === "sent") {
    return (
      <>
      <Suspense fallback={null}>
        <SearchParamsReader onChange={setParamKey} />
      </Suspense>
      <div role="status" aria-live="polite" className="rounded-2xl border border-line bg-white p-7 shadow-card sm:p-9">
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-green-50 text-green-700">
          <CheckCircle2 className="size-6" aria-hidden />
        </span>
        <h3 className="mt-4 text-2xl font-bold">{F.sentTitle}</h3>
        <p className="mt-3 leading-relaxed">{F.sentBody}</p>
        <Button variant="outline" className="mt-7" onClick={() => setStatus("idle")}>
          <Pencil className="size-4" aria-hidden />
          {F.sendAnother}
        </Button>
      </div>
      </>
    );
  }

  return (
    <>
      <Suspense fallback={null}>
        <SearchParamsReader onChange={setParamKey} />
      </Suspense>
    <form
      noValidate
      onSubmit={onSubmit}
      aria-labelledby="quote-form-heading"
      className="relative rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="quote-form-heading" tabIndex={-1} className="text-2xl font-bold outline-none">
          {F.heading}
        </h2>
      </div>


      {errorCount > 0 && (
        <p role="alert" className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-800">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          {errorCount === 1 ? F.checkFields : fmt(F.checkFieldsMany, { n: errorCount })}
        </p>
      )}

      <div className="mt-6 grid gap-x-5 gap-y-5 sm:grid-cols-2">
        <Field id={id("fullName")} label={F.name} required error={touched.fullName ? errors.fullName : undefined}>
          {(p) => <input {...p} type="text" autoComplete="name" value={values.fullName} onChange={set("fullName")} onBlur={blur("fullName")} />}
        </Field>
        <Field id={id("phone")} label={F.phone} required error={touched.phone ? errors.phone : undefined}>
          {(p) => (
            <input {...p} type="tel" inputMode="tel" autoComplete="tel" placeholder="04xx xxx xxx" value={values.phone} onChange={set("phone")} onBlur={blur("phone")} />
          )}
        </Field>
        <Field id={id("email")} label={F.email} hint={F.optional} error={touched.email ? errors.email : undefined}>
          {(p) => <input {...p} type="email" autoComplete="email" value={values.email} onChange={set("email")} onBlur={blur("email")} />}
        </Field>
        <Field id={id("suburb")} label={F.suburb} required error={touched.suburb ? errors.suburb : undefined}>
          {(p) => (
            <input {...p} type="text" autoComplete="address-level2" placeholder={F.suburbPlaceholder} value={values.suburb} onChange={set("suburb")} onBlur={blur("suburb")} />
          )}
        </Field>
        <Field id={id("enquiryType")} label={F.enquiryType} required error={touched.enquiryType ? errors.enquiryType : undefined} className="sm:col-span-2">
          {(p) => (
            <select {...p} value={values.enquiryType} onChange={set("enquiryType")} onBlur={blur("enquiryType")}>
              <option value="" disabled>
                {F.selectOption}
              </option>
              {enquiryTypes.map((o) => (
                <option key={o.key}>{F.enquiryTypes[o.key]}</option>
              ))}
            </select>
          )}
        </Field>

        <fieldset
          className="sm:col-span-2"
          aria-describedby={touched.installation && errors.installation ? `${id("installation")}-error` : undefined}
        >
          <legend className="text-sm font-semibold text-ink">
            {F.installation} <span className="text-flame-600" aria-hidden>*</span>
            <span className="sr-only"> {F.required}</span>
          </legend>
          <div className="mt-2 grid gap-2.5 sm:grid-cols-3">
            {installationRequirements.map((opt, i) => (
              <label
                key={opt.key}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-[0.95rem] font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-sky-500",
                  values.installation === F.installTypes[opt.key] ? "border-navy-900 bg-navy-50 text-navy-900" : "border-line hover:border-navy-900/40",
                  touched.installation && errors.installation && "border-red-400",
                )}
              >
                <input
                  type="radio"
                  name={`${uid}-installation`}
                  id={i === 0 ? id("installation") : undefined}
                  value={F.installTypes[opt.key]}
                  checked={values.installation === F.installTypes[opt.key]}
                  onChange={(e) => {
                    set("installation")(e);
                    setTouched((t) => ({ ...t, installation: true }));
                    setErrors((prev) => ({ ...prev, installation: undefined }));
                  }}
                  className="size-4 accent-navy-900 focus:outline-none"
                />
                {F.installTypes[opt.key]}
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

        <Field id={id("rooms")} label={F.rooms} hint={F.roomsHint}>
          {(p) => (
            <select {...p} value={values.rooms} onChange={set("rooms")}>
              <option value="">{F.selectOptional}</option>
              {F.roomOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          )}
        </Field>
        <Field id={id("roomNames")} label={F.roomNames} hint={F.optional}>
          {(p) => <input {...p} type="text" placeholder={F.roomNamesPlaceholder} value={values.roomNames} onChange={set("roomNames")} />}
        </Field>

        <Field id={id("preferred")} label={F.preferred} hint={F.preferredHint} className="sm:col-span-2">
          {(p) => (
            <>
              <input {...p} type="text" list={`${uid}-preferred-list`} value={values.preferred} onChange={set("preferred")} placeholder={F.preferredPlaceholder} />
              <datalist id={`${uid}-preferred-list`}>
                {preferredOptions.map((o) => (
                  <option key={o} value={o} />
                ))}
              </datalist>
            </>
          )}
        </Field>

        <Field
          id={id("existing")}
          label={F.existing}
          required={isVeu}
          hint={isVeu ? F.existingHintVeu : F.existingHint}
          className="sm:col-span-2"
          error={touched.existing ? errors.existing : undefined}
        >
          {(p) => (
            <input {...p} type="text" placeholder={F.existingPlaceholder} value={values.existing} onChange={set("existing")} onBlur={blur("existing")} />
          )}
        </Field>

        <Field
          id={id("message")}
          label={F.message}
          hint={F.optional}
          className="sm:col-span-2"
          error={touched.message ? errors.message : undefined}
        >
          {(p) => <textarea {...p} rows={4} value={values.message} onChange={set("message")} onBlur={blur("message")} className={cn(p.className, "h-auto py-3")} />}
        </Field>

        <div className="sm:col-span-2">
          <p className="text-sm font-semibold text-ink">
            {F.files}{" "}
            <span className="ml-1 text-xs font-normal text-muted">{fmt(F.filesHint, { max: MAX_FILES, mb: MAX_TOTAL_MB })}</span>
          </p>
          <p className="mt-1 text-sm text-muted">{F.filesExamples}</p>
          {files.length > 0 && (
            <ul className="mt-3 space-y-2">
              {files.map((f, i) => {
                const Icon = kindIcon[uploadKind(f) ?? "pdf"];
                return (
                  <li key={`${f.name}-${i}`} className="flex items-center gap-3 rounded-lg border border-line bg-surface px-3 py-2 text-sm">
                    <Icon className="size-4 shrink-0 text-navy-700" aria-hidden />
                    <span className="min-w-0 flex-1 truncate font-medium text-ink">{f.name}</span>
                    <span className="shrink-0 text-muted">{formatSize(f.size)}</span>
                    <button
                      type="button"
                      onClick={() => setFiles(files.filter((_, k) => k !== i))}
                      className="inline-flex size-7 shrink-0 items-center justify-center rounded-full text-muted hover:bg-white hover:text-ink"
                      aria-label={fmt(F.remove, { name: f.name })}
                    >
                      <X className="size-4" aria-hidden />
                    </button>
                  </li>
                );
              })}
              <li className="text-xs text-muted">
                {fmt(F.filesUsed, { used: formatSize(totalSize), mb: MAX_TOTAL_MB })}
              </li>
            </ul>
          )}
          {files.length < MAX_FILES && (
            <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-navy-900/25 px-4 py-2.5 text-sm font-semibold text-navy-800 transition-colors hover:border-navy-900/50 hover:bg-navy-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-sky-500">
              <Paperclip className="size-4" aria-hidden />
              {F.attach}
              <input type="file" multiple accept={ACCEPT_ANY} className="sr-only" onChange={(e) => { void addFiles(e.target.files); e.target.value = ""; }} />
            </label>
          )}
          {fileError && (
            <p role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-red-700">
              <AlertCircle className="size-3.5 shrink-0" aria-hidden />
              {fileError}
            </p>
          )}
        </div>
      </div>

      {/* Honeypot – hidden from people, bots tend to fill it in. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </div>
      <Turnstile ref={turnstile} onToken={setToken} />

      {status === "error" && (
        <p role="alert" className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
          {errorText}
        </p>
      )}

      <div className="mt-7 space-y-3 rounded-xl bg-surface px-4 py-4 text-sm leading-relaxed">
        <p className="text-muted">{F.collectionNotice}</p>
        <label className="flex cursor-pointer items-start gap-3 text-ink">
          <input
            id="quote-consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (e.target.checked) setConsentError(undefined);
            }}
            aria-invalid={consentError ? true : undefined}
            className="mt-0.5 size-4 shrink-0 accent-navy-900"
          />
          <span>
            {F.consent}{" "}
            <LocalizedLink href={routes.privacy} className="font-semibold underline underline-offset-2 hover:text-navy-700">
              {F.privacyLink}
            </LocalizedLink>
            {F.consentEnd}
          </span>
        </label>
        {consentError && (
          <p className="flex items-center gap-1.5 text-red-700">
            <AlertCircle className="size-3.5" aria-hidden />
            {consentError}
          </p>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-muted sm:max-w-xs">{F.requiredNote}</p>
        <Button type="submit" size="lg" disabled={status === "submitting"} className="sm:min-w-[13rem]">
          {status === "submitting" ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
          {F.submit}
          {status !== "submitting" && <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />}
        </Button>
      </div>
    </form>
    </>
  );
}

interface FieldRenderProps {
  id: string;
  name: string;
  className: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
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
