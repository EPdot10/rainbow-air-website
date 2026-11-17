/**
 * Upload rules shared by the quote form and the VEU questionnaire.
 * Attachments travel inside the enquiry email, so the total is capped at 20 MB:
 * after email encoding (+33%) that stays under Resend's 40 MB and Microsoft 365's 36 MB default limits.
 * Keep worker/index.js (ALLOWED_EXT / MAX_TOTAL_BYTES) in sync.
 */
export const MAX_TOTAL_MB = 20;
export const MAX_TOTAL_BYTES = MAX_TOTAL_MB * 1024 * 1024;
export const MAX_QUOTE_FILES = 10;
export const MAX_VEU_PHOTOS = 10;

export type UploadKind = "image" | "video" | "pdf" | "archive";

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|heic|heif|avif|bmp|tiff?)$/i;
const VIDEO_EXT = /\.(mp4|mov|m4v|webm|avi|3gp)$/i;
const PDF_EXT = /\.pdf$/i;
const ARCHIVE_EXT = /\.(zip|7z)$/i;

/** What kind of file this is, or null if it isn't accepted. */
export function uploadKind(f: File): UploadKind | null {
  const t = f.type.toLowerCase();
  if (IMAGE_EXT.test(f.name) || (t.startsWith("image/") && t !== "image/svg+xml")) return "image";
  if (VIDEO_EXT.test(f.name) || t.startsWith("video/")) return "video";
  if (PDF_EXT.test(f.name) || t === "application/pdf") return "pdf";
  if (ARCHIVE_EXT.test(f.name) || /^application\/(zip|x-zip-compressed|x-7z-compressed)$/.test(t)) return "archive";
  return null;
}

export const ACCEPT_IMAGES = "image/*,.heic,.heif,.jpg,.jpeg,.png,.webp,.gif,.avif";
export const ACCEPT_ANY = `${ACCEPT_IMAGES},video/*,.mov,.mp4,.m4v,.webm,.avi,.3gp,application/pdf,.pdf,.zip,.7z,application/zip,application/x-7z-compressed`;

export const formatSize = (b: number) => (b >= 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);
