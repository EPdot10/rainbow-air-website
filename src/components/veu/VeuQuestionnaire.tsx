"use client";

import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  ImagePlus,
  Loader2,
  Info,
  RotateCcw,
  X,
  XCircle,
} from "lucide-react";
import { cloneElement, useEffect, useId, useRef, useState, type FormEvent, type ReactElement, type ReactNode } from "react";
import { submitEnquiry, submitErrorMessage } from "@/data/form";
import { compressImage } from "@/lib/compressImage";
import { ACCEPT_ANY, ACCEPT_IMAGES, MAX_TOTAL_BYTES, MAX_TOTAL_MB, MAX_VEU_PHOTOS, uploadKind } from "@/lib/uploads";
import { Turnstile, type TurnstileHandle } from "@/components/forms/Turnstile";
import { veuPage } from "@/data/content";
import { routes, site, telHref } from "@/data/site";
import { quoteHref } from "@/lib/quote";
import { cn } from "@/lib/cn";
import { Button, ButtonLink } from "@/components/ui/Button";
import { LocalizedLink, useDict, useLocale } from "@/components/locale/LocaleComponents";
import { fmt } from "@/i18n";
import type { Ui } from "@/i18n/ui";

type Answer = "yes" | "no" | "unsure";
type Step = "gas" | "vic" | "disconnect" | "details" | "done";
type Stop = "no-gas" | "not-vic" | "no-disconnect" | null;

const MAX_PHOTOS = MAX_VEU_PHOTOS;
/** Photos + floor plan together (attachments travel inside the enquiry email). */
const MAX_MB = MAX_TOTAL_MB;

const hasUnsure: Record<"gas" | "vic" | "disconnect", boolean> = { gas: true, vic: false, disconnect: false };
const stopKey = { "no-gas": "noGas", "not-vic": "notVic", "no-disconnect": "noDisconnect" } as const;

interface Details {
  address: string;
  suburb: string;
  postcode: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  consent: boolean;
}
const emptyDetails: Details = { address: "", suburb: "", postcode: "", name: "", phone: "", email: "", notes: "", consent: false };
type DetailErrors = Partial<Record<keyof Details | "photos", string>>;

function validate(d: Details, ui: Ui): DetailErrors {
  const m = ui.quiz.errors;
  const e: DetailErrors = {};
  if (d.address.trim().length < 4) e.address = m.address;
  if (d.suburb.trim().length < 2) e.suburb = m.suburb;
  if (!/^3\d{3}$/.test(d.postcode.trim())) e.postcode = m.postcode;
  if (d.name.trim().length < 2) e.name = m.name;
  const digits = d.phone.replace(/[^\d]/g, "");
  if (!d.phone.trim()) e.phone = m.phone;
  else if (!/^[\d\s()+-]+$/.test(d.phone) || digits.length < 8 || digits.length > 12) e.phone = m.phoneInvalid;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) e.email = m.email;
  if (!d.consent) e.consent = m.consent;
  return e;
}

const fieldOrder: (keyof Details)[] = ["address", "suburb", "postcode", "name", "phone", "email", "consent"];

interface Photo {
  file: File;
  url: string;
}

/** Photo preview; formats the browser can't display (e.g. iPhone HEIC on Windows) show the file name instead. */
function PhotoThumb({ url, name, alt }: { url: string; name: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <span className="flex size-full flex-col items-center justify-center gap-1 bg-navy-50 p-1.5 text-center text-[0.68rem] leading-tight break-all text-navy-800" title={name}>
        <ImagePlus className="size-5 shrink-0" aria-hidden />
        <span className="line-clamp-2">{name}</span>
      </span>
    );
  return <img src={url} alt={alt} onError={() => setFailed(true)} className="size-full object-cover" />;
}

/**
 * VEU eligibility questionnaire – sends answers, photos and floor plan by email via /api/enquiry.
 * Q1 gas ducted → Q2 Victoria → Q3 agree to disconnect → address, photos & contact details.
 * Any "No" stops the flow immediately and hides the remaining questions.
 */
export function VeuQuestionnaire() {
  const uid = useId();
  const { ui } = useDict();
  const locale = useLocale();
  const Q = ui.quiz;
  const D = Q.details;
  const [step, setStep] = useState<Step>("gas");
  const [answers, setAnswers] = useState<Partial<Record<"gas" | "vic" | "disconnect", Answer>>>({});
  const [stop, setStop] = useState<Stop>(null);
  const [details, setDetails] = useState<Details>(emptyDetails);
  const [errors, setErrors] = useState<DetailErrors>({});
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const [floorPlan, setFloorPlan] = useState<File | null>(null);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const turnstile = useRef<TurnstileHandle>(null);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
    headingRef.current?.closest("section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step, stop]);

  useEffect(() => () => photos.forEach((p) => URL.revokeObjectURL(p.url)), [photos]);

  const order: Step[] = ["gas", "vic", "disconnect", "details"];
  const progressIndex = step === "done" ? 4 : order.indexOf(step);

  const answer = (q: "gas" | "vic" | "disconnect", a: Answer) => {
    setAnswers((prev) => ({ ...prev, [q]: a }));
    if (a === "unsure") return; // show explanation, stay on this question
    if (a === "no") {
      setStop(q === "gas" ? "no-gas" : q === "vic" ? "not-vic" : "no-disconnect");
      return;
    }
    setStop(null);
    setStep(q === "gas" ? "vic" : q === "vic" ? "disconnect" : "details");
  };

  const back = () => {
    if (stop) {
      setStop(null);
      return;
    }
    const i = order.indexOf(step);
    if (i > 0) setStep(order[i - 1]);
  };

  const restart = () => {
    setStep("gas");
    setAnswers({});
    setStop(null);
    setDetails(emptyDetails);
    setErrors({});
    setPhotos([]);
    setFloorPlan(null);
    setPhotoError(null);
    setSendError(null);
  };

  const addPhotos = async (files: FileList | null) => {
    if (!files) return;
    setPhotoError(null);
    const next = [...photos];
    let total = next.reduce((n, p) => n + p.file.size, 0) + (floorPlan?.size ?? 0);
    for (const original of Array.from(files)) {
      if (uploadKind(original) !== "image") {
        setPhotoError(Q.errors.photoType);
        continue;
      }
      if (next.length >= MAX_PHOTOS) {
        setPhotoError(fmt(Q.errors.photoMax, { max: MAX_PHOTOS }));
        break;
      }
      // Large phone photos are resized in the browser before upload (keeps emails small and free).
      const f = await compressImage(original);
      if (total + f.size > MAX_TOTAL_BYTES) {
        setPhotoError(fmt(Q.errors.photoSize, { mb: MAX_MB }));
        continue;
      }
      total += f.size;
      next.push({ file: f, url: URL.createObjectURL(f) });
    }
    setPhotos(next);
  };

  const addFloorPlan = async (files: FileList | null) => {
    const original = files?.[0];
    if (!original) return;
    setPhotoError(null);
    const kind = uploadKind(original);
    if (!kind) {
      setPhotoError(Q.errors.planType);
      return;
    }
    const f = kind === "image" ? await compressImage(original, 2400) : original;
    const photosTotal = photos.reduce((n, p) => n + p.file.size, 0);
    if (photosTotal + f.size > MAX_TOTAL_BYTES) {
      setPhotoError(fmt(Q.errors.planSize, { mb: MAX_MB }));
      return;
    }
    setFloorPlan(f);
  };

  const removePhoto = (i: number) => {
    URL.revokeObjectURL(photos[i].url);
    setPhotos(photos.filter((_, k) => k !== i));
  };

  const set = (f: keyof Details) => (e: { target: { value: string } }) => {
    const next = { ...details, [f]: e.target.value };
    setDetails(next);
    if (errors[f]) setErrors((prev) => ({ ...prev, [f]: validate(next, ui)[f] }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(details, ui);
    setErrors(errs);
    const first = fieldOrder.find((k) => errs[k]);
    if (first) {
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    if (!token) {
      setSendError(ui.form.errors.securityWait);
      return;
    }
    setSending(true);
    setSendError(null);
    const data = new FormData();
    data.set("kind", "veu");
    data.set("lang", locale);
    data.set("gas", "Yes");
    data.set("vic", "Yes");
    data.set("disconnect", "Yes");
    for (const k of ["address", "suburb", "postcode", "name", "phone", "email", "notes"] as const) data.set(k, details[k]);
    data.set("consent", details.consent ? "Yes" : "No");
    photos.forEach((p) => data.append("photos", p.file, p.file.name));
    if (floorPlan) data.append("floorPlan", floorPlan, floorPlan.name);
    data.set("website", honeypot);
    data.set("cf-turnstile-response", token);
    const result = await submitEnquiry(data);
    turnstile.current?.reset();
    setSending(false);
    if (result.ok) setStep("done");
    else setSendError(submitErrorMessage(result.error, ui));
  };

  const q = step === "gas" || step === "vic" || step === "disconnect" ? step : null;

  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-lift sm:p-9">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-muted">
          {stop ? Q.result : step === "done" ? Q.sent : step === "details" ? Q.stepDetails : fmt(Q.question, { n: progressIndex + 1 })}
        </p>
      </div>
      <div className="mt-3 flex gap-1.5" aria-hidden>
        {order.map((s, i) => (
          <span
            key={s}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors duration-300",
              stop && i === progressIndex ? "bg-red-400" : i <= progressIndex ? "bg-navy-900" : "bg-navy-900/10",
            )}
          />
        ))}
      </div>

      {/* ── Stop ── */}
      {stop && (
        <div className="mt-8" role="status" aria-live="polite">
          <XCircle className="size-10 text-red-500" aria-hidden />
          <h3 ref={headingRef} tabIndex={-1} className="mt-4 text-2xl font-bold outline-none">
            {Q.stop[stopKey[stop]].title}
          </h3>
          <p className="mt-3 max-w-2xl leading-relaxed">{Q.stop[stopKey[stop]].body}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {stop !== "not-vic" && (
              <ButtonLink href={routes.services} size="lg">
                {Q.viewServices}
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            )}
            <ButtonLink href={quoteHref({ type: "general" })} size="lg" variant="outline">
              {Q.contactUs}
            </ButtonLink>
            <Button type="button" variant="link" size="lg" onClick={back}>
              <ArrowLeft className="size-4" aria-hidden />
              {Q.changeAnswer}
            </Button>
          </div>
        </div>
      )}

      {/* ── Questions ── */}
      {!stop && q && (
        <fieldset className="mt-8">
          <legend className="w-full">
            <h3 ref={headingRef} tabIndex={-1} className="text-[1.45rem] leading-snug font-bold outline-none sm:text-2xl">
              {Q.q[q].title}
            </h3>
          </legend>
          {Q.q[q].help && <p className="mt-2 max-w-2xl text-[0.97rem] text-muted">{Q.q[q].help}</p>}
          <div className={cn("mt-6 grid gap-3", hasUnsure[q] ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
            {(hasUnsure[q] ? (["yes", "no", "unsure"] as const) : (["yes", "no"] as const)).map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => answer(q, a)}
                aria-pressed={answers[q] === a}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-xl border-2 px-5 py-4 text-[1.02rem] font-semibold transition-colors",
                  answers[q] === a ? "border-navy-900 bg-navy-50 text-navy-900" : "border-line text-ink hover:border-navy-900/40",
                )}
              >
                {a === "yes" ? <CheckCircle2 className="size-5 text-green-600" aria-hidden /> : a === "no" ? <XCircle className="size-5 text-red-500" aria-hidden /> : <HelpCircle className="size-5 text-sky-600" aria-hidden />}
                {a === "yes" ? Q.yes : a === "no" ? Q.no : Q.unsure}
              </button>
            ))}
          </div>

          {q === "gas" && answers.gas === "unsure" && (
            <div className="mt-6 rounded-2xl bg-sky-50 p-5 sm:p-6" role="status" aria-live="polite">
              <p className="flex items-center gap-2 font-bold text-navy-900">
                <Info className="size-5 text-sky-600" aria-hidden />
                {Q.unsureBox.title}
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.97rem] text-navy-900/85">
                {Q.unsureBox.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              <p className="mt-3 text-[0.97rem] text-navy-900/85">{Q.unsureBox.still}</p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button type="button" onClick={() => answer("gas", "yes")}>
                  {Q.unsureBox.yesHave}
                </Button>
                <ButtonLink href={quoteHref({ type: "veu", item: Q.unsureBox.askItem })} variant="outline">
                  {Q.unsureBox.askCheck}
                </ButtonLink>
              </div>
            </div>
          )}

          {q !== "gas" && (
            <button type="button" onClick={back} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-ink">
              <ArrowLeft className="size-4" aria-hidden />
              {Q.back}
            </button>
          )}
        </fieldset>
      )}

      {/* ── Details ── */}
      {!stop && step === "details" && (
        <form noValidate onSubmit={submit} className="mt-8" aria-labelledby={`${uid}-details-title`}>
          <h3 id={`${uid}-details-title`} ref={headingRef} tabIndex={-1} className="text-[1.45rem] font-bold outline-none sm:text-2xl">
            {D.title}
          </h3>
          <p className="mt-2 text-[0.97rem] text-muted">{D.intro}</p>

          <div className="mt-7 grid gap-5 sm:grid-cols-6">
            <TextField id={`${uid}-address`} label={D.address} required error={errors.address} className="sm:col-span-6">
              <input type="text" autoComplete="street-address" value={details.address} onChange={set("address")} />
            </TextField>
            <TextField id={`${uid}-suburb`} label={D.suburb} required error={errors.suburb} className="sm:col-span-4">
              <input type="text" autoComplete="address-level2" value={details.suburb} onChange={set("suburb")} />
            </TextField>
            <TextField id={`${uid}-postcode`} label={D.postcode} required error={errors.postcode} className="sm:col-span-2">
              <input type="text" inputMode="numeric" maxLength={4} autoComplete="postal-code" placeholder="3xxx" value={details.postcode} onChange={set("postcode")} />
            </TextField>

            <div className="sm:col-span-6">
              <p className="text-sm font-semibold text-ink">
                {D.photos} <span className="ml-1 text-xs font-normal text-muted">{fmt(D.photosHint, { max: MAX_PHOTOS, mb: MAX_MB })}</span>
              </p>
              <p className="mt-1 text-sm text-muted">{D.photosExamples}</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {photos.map((p, i) => (
                  <div key={p.url} className="relative size-24 overflow-hidden rounded-xl border border-line">
                    <PhotoThumb url={p.url} name={p.file.name} alt={fmt(D.photoAlt, { n: i + 1, name: p.file.name })} />
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      className="absolute top-1 right-1 inline-flex size-7 items-center justify-center rounded-full bg-navy-950/75 text-white hover:bg-navy-950"
                      aria-label={fmt(D.removePhoto, { n: i + 1 })}
                    >
                      <X className="size-4" aria-hidden />
                    </button>
                  </div>
                ))}
                {photos.length < MAX_PHOTOS && (
                  <label className="flex size-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-navy-900/20 text-sm font-semibold text-navy-800 transition-colors hover:border-navy-900/50 hover:bg-navy-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-sky-500">
                    <ImagePlus className="size-6" aria-hidden />
                    {D.add}
                    <input type="file" accept={ACCEPT_IMAGES} multiple className="sr-only" onChange={(e) => { void addPhotos(e.target.files); e.target.value = ""; }} />
                  </label>
                )}
              </div>
              <div className="mt-5 rounded-xl bg-sky-50 p-4">
                <p className="text-sm font-semibold text-ink">
                  {D.plan} <span className="ml-1 text-xs font-normal text-muted">{fmt(D.planHint, { mb: MAX_MB })}</span>
                </p>
                <p className="mt-1 text-sm text-muted">{D.planBody}</p>
                {floorPlan ? (
                  <p className="mt-3 flex items-center gap-2 text-sm">
                    <CheckCircle2 className="size-4 text-green-600" aria-hidden />
                    <span className="min-w-0 truncate font-semibold text-ink">{floorPlan.name}</span>
                    <button type="button" onClick={() => setFloorPlan(null)} className="font-semibold text-muted underline hover:text-ink">
                      {D.remove}
                    </button>
                  </p>
                ) : (
                  <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-navy-900/20 bg-white px-4 py-2.5 text-sm font-semibold text-navy-800 transition-colors hover:border-navy-900/50 has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-sky-500">
                    <ImagePlus className="size-4" aria-hidden />
                    {D.addPlan}
                    <input type="file" accept={ACCEPT_ANY} className="sr-only" onChange={(e) => { void addFloorPlan(e.target.files); e.target.value = ""; }} />
                  </label>
                )}
              </div>
              {photoError && (
                <p className="mt-2 flex items-center gap-1.5 text-sm text-red-700" role="alert">
                  <AlertCircle className="size-3.5" aria-hidden />
                  {photoError}
                </p>
              )}
            </div>

            <TextField id={`${uid}-name`} label={D.name} required error={errors.name} className="sm:col-span-6">
              <input type="text" autoComplete="name" value={details.name} onChange={set("name")} />
            </TextField>
            <TextField id={`${uid}-phone`} label={D.phone} required error={errors.phone} className="sm:col-span-3">
              <input type="tel" inputMode="tel" autoComplete="tel" placeholder="04xx xxx xxx" value={details.phone} onChange={set("phone")} />
            </TextField>
            <TextField id={`${uid}-email`} label={D.email} required error={errors.email} className="sm:col-span-3">
              <input type="email" autoComplete="email" value={details.email} onChange={set("email")} />
            </TextField>
            <TextField id={`${uid}-notes`} label={D.notes} hint={D.optional} className="sm:col-span-6">
              <textarea rows={3} value={details.notes} onChange={set("notes")} className="h-auto py-3" />
            </TextField>

            <div className="sm:col-span-6">
              <p className="mb-3 rounded-xl bg-surface px-4 py-3 text-sm leading-relaxed text-muted">{D.notice}</p>
              <label className="flex cursor-pointer items-start gap-3 text-[0.95rem]">
                <input
                  id={`${uid}-consent`}
                  type="checkbox"
                  checked={details.consent}
                  onChange={(e) => {
                    const next = { ...details, consent: e.target.checked };
                    setDetails(next);
                    if (errors.consent) setErrors((p) => ({ ...p, consent: validate(next, ui).consent }));
                  }}
                  aria-invalid={errors.consent ? true : undefined}
                  className="mt-1 size-4 shrink-0 accent-navy-900"
                />
                <span>
                  {D.consent}{" "}
                  <LocalizedLink href={routes.privacy} className="font-semibold underline underline-offset-2">
                    {D.privacy}
                  </LocalizedLink>
                  {D.consentEnd}
                </span>
              </label>
              {errors.consent && (
                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-red-700">
                  <AlertCircle className="size-3.5" aria-hidden />
                  {errors.consent}
                </p>
              )}
            </div>
          </div>

          <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label>
              Website
              <input type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
            </label>
          </div>
          <Turnstile ref={turnstile} onToken={setToken} />
          {sendError && (
            <p role="alert" className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
              {sendError}
            </p>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button type="button" onClick={back} className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-muted hover:text-ink">
              <ArrowLeft className="size-4" aria-hidden />
              {Q.back}
            </button>
            <Button type="submit" size="lg" className="sm:min-w-[14rem]" disabled={sending}>
              {sending && <Loader2 className="size-4 animate-spin" aria-hidden />}
              {sending ? D.sending : D.submit}
              {!sending && <ArrowRight className="size-4" aria-hidden />}
            </Button>
          </div>
          <Disclaimer />
        </form>
      )}

      {/* ── Done (sent) ── */}
      {step === "done" && (
        <div className="mt-8" role="status" aria-live="polite">
          <span className="inline-flex size-12 items-center justify-center rounded-full bg-green-50 text-green-700">
            <CheckCircle2 className="size-6" aria-hidden />
          </span>
          <h3 ref={headingRef} tabIndex={-1} className="mt-4 text-2xl font-bold outline-none">
            {Q.done.title}
          </h3>
          <p className="mt-3 max-w-2xl leading-relaxed">
            {Q.done.body}{" "}
            <a className="font-semibold underline" href={telHref(site.contact.phone)}>
              {site.contact.phone}
            </a>
            .
          </p>
          <dl className="mt-5 grid gap-x-6 gap-y-2 rounded-xl bg-surface p-4 text-sm sm:grid-cols-2">
            {(
              [
                [Q.done.gas, Q.yes],
                [Q.done.vic, Q.yes],
                [Q.done.disconnect, Q.yes],
                [Q.done.suburb, `${details.suburb} ${details.postcode}`],
                [Q.done.photos, String(photos.length)],
                [Q.done.plan, floorPlan ? Q.done.attached : Q.done.notAttached],
              ] as const
            ).map(([k, v]) => (
              <div key={k}>
                <dt className="text-muted">{k}</dt>
                <dd className="font-semibold text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <Button type="button" variant="outline" className="mt-7" onClick={restart}>
            <RotateCcw className="size-4" aria-hidden />
            {Q.done.again}
          </Button>
          <Disclaimer />
        </div>
      )}
    </div>
  );
}

function Disclaimer() {
  return (
    <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">
      <strong className="font-semibold text-ink">{veuPage.disclaimerTitle}</strong> {veuPage.disclaimer}
    </p>
  );
}

function TextField({
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
  children: ReactNode;
}) {
  const child = children as ReactElement<Record<string, unknown>>;
  const base =
    "block h-12 w-full rounded-lg border bg-white px-3.5 text-[0.98rem] text-ink placeholder:text-muted/70 transition-[border-color,box-shadow] focus:border-sky-500 focus:shadow-[0_0_0_3px_rgb(26_139_224/0.18)] focus:outline-none";
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {required && (
          <span className="text-flame-600" aria-hidden>
            {" "}
            *
          </span>
        )}
        {hint && <span className="ml-2 text-xs font-normal text-muted">{hint}</span>}
      </label>
      <div className="mt-1.5">
        {cloneWith(child, {
          id,
          "aria-invalid": error ? true : undefined,
          "aria-required": required || undefined,
          "aria-describedby": error ? `${id}-error` : undefined,
          className: cn(base, error ? "border-red-400" : "border-line hover:border-navy-900/30", child.props.className as string | undefined),
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

function cloneWith(el: ReactElement<Record<string, unknown>>, props: Record<string, unknown>) {
  return cloneElement(el, props);
}
