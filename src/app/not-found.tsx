import Link from "next/link";

/** Safety net for mistyped URLs – sends visitors back to the homepage rather than a bare 404. */
export default function NotFound() {
  return (
    <div className="flex min-h-[70svh] flex-col items-center justify-center gap-6 bg-surface px-6 text-center">
      <h1 className="text-3xl font-bold">This page is coming soon</h1>
      <p className="max-w-md text-muted">
        We’re building out the rest of the Rainbow Air website. In the meantime, everything you need is on the homepage.
      </p>
      <Link href="/" className="rounded-lg bg-flame-600 px-6 py-3 font-semibold text-white hover:bg-flame-700">
        Go to the homepage
      </Link>
    </div>
  );
}
