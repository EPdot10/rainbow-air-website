import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";

/**
 * Cartoon placeholder avatars (DiceBear "Lorelei" style, CC0 1.0), generated at build time.
 * Replace with real customer photos or initials once verified reviews are supplied.
 */
const backgrounds = ["dbeafe", "fde68a", "fecaca", "bbf7d0", "e9d5ff", "fed7aa", "cffafe"];

export function avatarDataUri(seed: string, index = 0): string {
  return createAvatar(lorelei, {
    seed,
    backgroundColor: [backgrounds[index % backgrounds.length]],
    radius: 50,
  }).toDataUri();
}
